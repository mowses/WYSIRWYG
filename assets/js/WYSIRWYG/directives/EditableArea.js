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

			// draggable elements should be bound on $elements change
			// not when they are selected because they should should be draggable even when not selected
			$scope.$watchCollection('$elements', function(elements) {
				$.each(elements, function(i, element) {
					var $element = $(element),
						css = $element.css(['position']);

					$element
						.draggable({
							appendTo: 'body',
							cursor: 'move',
							disabled: ($.inArray(css.position, ['absolute', 'fixed']) == -1),
							delay: 80
						});
				});
			});

			// watch for DOM elements selection change
			$scope.$watchCollection('$selected', function(new_selected, old_selected) { // http://teropa.info/blog/2014/01/26/the-three-watch-depths-of-angularjs.html
				$(old_selected).removeClass('ui-selected');  // deselect old
				
				$.each(new_selected, function(i, element) {
					var $element = $(element),
						css = $element.css(['position', 'display']),
						resizable = {
							alsoResize: false,
							disabled: ($.inArray(css.display, ['inline']) >= 0),
							handles: 'all',
							create: function() {
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
							}
						};

					$element
						.addClass('ui-selected')
						.toggleClass('ui-resizable-disabled', resizable.disabled)
						.resizable(resizable);
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

					// every time selectees elements is clicked
					$scope.$elements.on('mousedown', function(event) {
						// prevent mousedown propagation
						event.stopPropagation();

						var target = $(event.target);

						if (target.is('.ui-resizable-handle')) return;

						var $el = $(this),
							index = $.inArray(this, $scope.$selected);

						if (!event.ctrlKey) {
							$scope.$selected = $el;
						} else if(index == -1) {
							$scope.$selected = $scope.$selected.add($el);
						} else {
							$scope.$selected = $scope.$selected.not($el);
						}

						$scope.$apply();
					});
				}
			};
		}
	};
}]);