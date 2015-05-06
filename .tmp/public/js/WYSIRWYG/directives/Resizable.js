angular.module('WYSIRWYG.Resizable', [])

.directive('resizable', [function() {

	return {
		restrict: 'A',
		transclude: false,
		priority: -1000,

		compile: function($element, attrs) {

			return {
				pre: function(scope, $element, attrs) {

				},

				post: function(scope, $element, attrs) {
					/*attrs.$observe('resizable', function() {
						//console.log('foo reizable', attrs.resizable);
						//$element.resizable('option', 'disabled', attrs.resizable);
					});*/
console.log('cofog', $scope.boundingBoxes[0].config.resizable, attrs.resizable);
					$element.resizable($scope[attrs['res-config']]);
				}
			};
		}
	};
}]);