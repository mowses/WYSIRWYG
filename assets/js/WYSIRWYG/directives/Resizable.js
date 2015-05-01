angular.module('WYSIRWYG.Resizable', [])

.directive('resizable', [function() {

	return {
		restrict: 'A',
		transclude: false,
		priority: -1000,

		compile: function($element, attrs) {

			return {
				pre: function($scope, $element, attrs) {

				},

				post: function($scope, $element, attrs) {
					attrs.$observe('resizable', function() {
						//console.log('foo reizable', attrs.resizable);
						//$element.resizable('option', 'disabled', attrs.resizable);
					});

					$element.resizable({
						handles: attrs.resHandles
					});
				}
			};
		}
	};
}]);