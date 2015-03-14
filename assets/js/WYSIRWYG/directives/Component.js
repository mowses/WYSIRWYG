'use strict';

angular.module('WYSIRWYG.Component', [])

.directive('component', ['$compile', function($compile) {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			data: '='
		},

		controller: ['$scope', '$element', function($scope, $element) {
			$.extend($scope, $scope.data);

			$scope.$watch('data', function() {
				var html = $scope.data.html,
					compiled = $compile('<div>' + html + '</div>')($scope);

				$element
					.empty()
					.append(compiled.contents());
			}, true);
		}]
	};
}]);