angular.module('WYSIRWYG.Draggable', [])

.directive('draggable', [function() {

	return {
		restrict: 'A',
		transclude: false,
		priority: -1000,

		compile: function($element, $attrs) {
			// $.ui.draggable.prototype.options
			
			return {
				pre: function($scope, $element, $attrs) {

				},

				post: function($scope, $element) {
					$element.draggable({
						delay: $attrs.dragDelay,
						disabled: $attrs.dragDisabled
					});
				}
			};
		}
	};
}]);