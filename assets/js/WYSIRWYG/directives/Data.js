angular.module('WYSIRWYG.data', [])

.directive('data', ['$compile', function($compile) {
	'use strict';

	return {
		restrict: 'E',
		transclude: true,
		scope: {
			id: '@'
		},

		controller: ['$scope', function($scope) {

		}],

		compile: function($element, $attrs) {

			return {
				post: function($scope, $element) {
					console.log('=DATA:', $scope.id, $scope.$parent);
					$scope.$parent.$watch('data.data["' + $scope.id + '"]', function(new_data) {
						$element.empty().append(new_data);
					});
				}
			}
		}
	};
}]);