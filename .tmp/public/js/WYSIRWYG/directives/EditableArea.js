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

			// for each element that can be resizable
			$scope.$watchCollection('$elements', function(elements) {
				$.each(elements, function(i, element) {
					var $element = $(element),
						css = $element.css(['position']);

					$element
						.resizable({
							alsoResize: false,
							disabled: false,
							handles: 'all',
							start: function(event, ui) {
								/*if (event.ctrlKey) {
									$element.resizable('option', 'alsoResize', $scope.$selected);
								}*/
							},
							create: function() {
								$element.find('> .ui-resizable-handle').removeAttr('style');
							}
						})
						.draggable({
							disabled: ($.inArray(css.position, ['absolute', 'fixed']) == -1),
							delay: 90
						});
				});
			});

			// watch for DOM elements selection change
			$scope.$watchCollection('$selected', function(new_selected, old_selected) { // http://teropa.info/blog/2014/01/26/the-three-watch-depths-of-angularjs.html
				$(old_selected).removeClass('ui-selected');  // deselect old
				$(new_selected).addClass('ui-selected');  // select new
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