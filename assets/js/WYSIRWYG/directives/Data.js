angular.module('WYSIRWYG.data', [])

.directive('data', ['$compile', function($compile) {
	'use strict';

	return {
		restrict: 'E',
		transclude: true,
		require: '^component',
		scope: {
			id: '@'
		},

		controller: ['$scope', '$element', function($scope, $element) {
			var component_scope = $scope.$parent,
				data = component_scope.data.data,
				index = $scope.id;

			$element
				.empty()
				.append(data[index]);
		}]
	};
}]);