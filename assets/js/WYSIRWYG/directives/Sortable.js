angular.module('WYSIRWYG.Sortable', [])

.directive('sortable', [function() {

	return {
		restrict: 'A',
		transclude: false,
		priority: -1000,

		compile: function($element, $attrs) {

			return {
				pre: function($scope, $element, $attrs) {

				},

				post: function($scope, $element) {
					$element.sortable({
						
					});
				}
			};
		}
	};
}]);