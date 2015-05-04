angular.module('WYSIRWYG.EditableArea', [])

.directive('editableArea', ['$compile', function($compile) {

	return {
		restrict: 'A',
		transclude: false,
		scope: {

		},

		controller: ['$scope', function($scope) {
			$scope.$elements = $(null);
			$scope.$selected = $(null);
			$scope.$boundingBoxes = [];

			/**
			 * select/deselect bb
			 */
			$scope.selectBB = function(event) {
				// prevent mousedown propagation
				event.stopPropagation();

				var target = $(event.target);

				if (target.is('.ui-resizable-handle')) return;

				var el = event.currentTarget,
					$el = $(el),
					index = $.inArray(el, $scope.$selected);

				if (!event.ctrlKey) {
					$scope.$selected = $el;
				} else if(index == -1) {
					$scope.$selected = $scope.$selected.add($el);
				} else {
					$scope.$selected = $scope.$selected.not($el);
				}
			}

			// watch for DOM elements selection change
			$scope.$watchCollection('$selected', function(new_selected, old_selected) { // http://teropa.info/blog/2014/01/26/the-three-watch-depths-of-angularjs.html
				// deselect old
				$(old_selected).removeClass('ui-selected');
				// select new
				$(new_selected).addClass('ui-selected');
			});

			// create bounding-boxes for each element
			$scope.$watchCollection('$elements', function(new_elements, old_elements) {
				// remove previous bounding-boxes
				

				// create bounding-boxes to all elements
				$.each(new_elements, function(i, element) {
					var $element = $(element),
						// bounding-box should inherit `style` attribute from $element
						$bounding_box = $('<bounding-box draggable resizable ng-mousedown="selectBB($event)"></bounding-box>').attr('style', $element.attr('style')),
						css = $bounding_box.css(['position']),
						// bb attributes
						attrs = {
							// draggable config
							drag: {
								'append-to': 'body',
								cursor: 'move',
								delay: 80,
								disabled: ($.inArray(css.position, ['absolute', 'fixed']) == -1)
							},
							// resizable config
							res: {
								'also-resize': false,
								disabled: ($.inArray(css.display, ['inline']) >= 0),
								handles: 'all',
								/*create: function() {
									$element.find('> .ui-resizable-handle').removeAttr('style');  // prevent jQuery stylize element, so we can change its style via css
								},
								start: function(event, ui) {
									var instance = ui.element.resizable('instance'),
										width = instance.sizeDiff.width + ui.originalSize.width,
										height = instance.sizeDiff.height + ui.originalSize.height;

									ui.originalSize._bkp = {
										width: ui.originalSize.width,
										height: ui.originalSize.height
									};
									ui.originalSize.width = width;
									ui.originalSize.height = height;
									ui.size.width = undefined;
									ui.size.height = undefined;
								},
								resize: function(event, ui) {
									var max = Math.max,
										min = Math.min;

									if (ui.size.width) {
										ui.size.width = max(ui.size.width, ui.originalSize.width - ui.originalSize._bkp.width);
										ui.position.left = min(ui.position.left, ui.originalPosition.left + ui.originalSize._bkp.width);
									}
									if (ui.size.height) {
										ui.size.height = max(ui.size.height, ui.originalSize.height - ui.originalSize._bkp.height);
										ui.position.top = min(ui.position.top, ui.originalPosition.top + ui.originalSize._bkp.height);
									}
								}*/
							}
						},
						bb_scope = $scope.$new(),
						compiled;

					// set bb attrs
					$.each(attrs, function(attr, config) {
						$.each(config, function(k, param) {
							$bounding_box.attr(attr + '-' + k, param);
						});
					});

					compiled = $compile($bounding_box)(bb_scope);
					
					// add compiled to DOM and insert $element inside it
					$element.removeAttr('style').after(compiled);
					compiled.prepend($element);

					// add compiled BB to BBs array
					$scope.$boundingBoxes.push(compiled);
				});
			});
		}],

		compile: function($element, $attrs) {
			return {
				pre: function($scope, $element, $attrs) {

				},

				post: function($scope, $element) {
					$scope.$elements = $element.find('> *');

					// selectable
					// every time the editable-area element is clicked
					$element
					.on('mousedown', function(event) {
						if (event.ctrlKey) return;
						$scope.$selected = $(null);
						$scope.$apply();
					});
				}
			};
		}
	};
}]);