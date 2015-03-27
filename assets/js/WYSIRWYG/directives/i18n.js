angular.module('WYSIRWYG.i18n', [])

.directive('i18n', ['$compile', function($compile) {
	'use strict';

	return {
		restrict: 'E',
		transclude: true,
		scope: {
			id: '@',
			language: '@',
			data: '='
		},

		controller: ['$scope', function($scope) {
			console.log($scope);
			$scope.language = $scope.language || $scope.getParentLanguage($scope.$parent) || Object.keys($scope.data)[0];
		}],

		compile: function($element, $attrs) {
			$attrs.data = $attrs.data || 'data.i18n';

			return {
				post: function($scope, $element) {
					
					$scope.$watch('data["' + $scope.language + '"]["' + $scope.id + '"]', function(string) {
						var compiled = $compile('<div>' + string + '</div>')($scope.$parent);
						$element.empty().append(compiled.contents());
					});
				}
			}
		}
	};
}]);