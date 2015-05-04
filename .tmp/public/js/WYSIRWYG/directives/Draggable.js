angular.module('WYSIRWYG.Draggable', [])

.directive('draggable', ['getAttributes', function(getAttributes) {

	return {
		restrict: 'A',
		transclude: false,
		priority: -1000,

		compile: function($element, attrs) {
			// $.ui.draggable.prototype.options
			
			return {
				pre: function(scope, $element, attrs) {

				},

				post: function(scope, $element, attrs) {
					$element.draggable(getAttributes('drag', attrs));
				}
			};
		}
	};
}]);