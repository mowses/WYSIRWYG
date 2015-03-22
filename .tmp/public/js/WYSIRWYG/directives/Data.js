angular.module('WYSIRWYG.data', [])

.directive('data', ['$compile', function($compile) {
	'use strict';

	return {
		restrict: 'E',
		transclude: true,
		//require: '^component',
		scope: {
			id: '@'
		},

		link: function($scope, $element) {
			var component_scope = $scope.$parent,
				data = component_scope.data.data,
				index = $scope.id;

			component_scope.$watch('data.data["' + index + '"]', function(data) {
				$element
					.empty()
					.append(data);
			});
		}
	};
}]);