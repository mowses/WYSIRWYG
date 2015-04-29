angular.module('WYSIRWYG.Editor', [])

.directive('wysirwygEditor', ['$compile', function($compile) {

	return {
		restrict: 'A',
		transclude: false,
		
		compile: function($element, $attrs) {
			
			return {
				pre: function($scope, $element, $attrs) {
					
				},

				post: function($scope, $element) {
					$element.selectable({
						autoRefresh: false,
						filter: '> *'
					});
				}
			};
		}
	};
}]);