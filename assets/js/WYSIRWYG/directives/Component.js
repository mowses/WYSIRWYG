angular.module('WYSIRWYG.Component', [])

.directive('component', ['$compile', function($compile) {
	'use strict';

	return {
		restrict: 'E',
		transclude: true,
		scope: {
			data: '='
		},

		controller: ['$scope', '$element', function($scope, $element) {
			$.extend($scope, $scope.data);

			$scope.$watch('data', function() {
				var template = $scope.data.template,
					compiled = $compile('<div>' + template + '</div>')($scope);

				$element
					.empty()
					.append(compiled.contents());
			}, true);
		}]
	};
}]);