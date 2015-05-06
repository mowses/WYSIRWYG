angular.module('WYSIRWYG.Draggable', [])

.directive('draggable', ['$parse', function($parse) {

	return {
		restrict: 'A',
		transclude: false,
		priority: -1000,

		compile: function($element, attrs) {
			
			return {
				pre: function(scope, $element, attrs) {

				},

				post: function(scope, $element, attrs) {
					attrs.$observe('draggable', function(draggable) {
						var parsed = $parse(draggable);

						scope.$watch(function() {
							return parsed(scope);
						}, function(config) {
							$element.draggable(config);
						});
					});
				}
			};
		}
	};
}]);