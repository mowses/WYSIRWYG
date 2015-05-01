angular.module('WYSIRWYG.Grid', [])

.directive('grid', [function() {

	return {
		restrict: 'A',
		transclude: false,
		priority: -1000,

		compile: function($element, $attrs) {

			return {
				pre: function($scope, $element, $attrs) {

				},

				post: function($scope, $element) {
					
				}
			};
		}
	};
}]);