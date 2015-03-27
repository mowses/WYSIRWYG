angular.module('WYSIRWYG.i18n', [])

.directive('i18n', ['$compile', function($compile) {
	'use strict';

	return {
		restrict: 'E',
		transclude: true,
		scope: {
			id: '@',
			language: '@'
		},

		controller: ['$scope', function($scope) {
			$scope.getParentLanguage = function(scope) {
				if (scope.language) return scope.language;
				if (!scope.$parent) return;

				return $scope.getParentLanguage(scope.$parent);
			}
			$scope.language = $scope.language || $scope.getParentLanguage($scope.$parent);
			// i18n deve herdar data do scopo pai (para que a directive <data> saiba de onde pegar as variaveis)
			// não passar $scope.$parent no compile pois esta directive deverá funcionar mesmo quando não estiver dentro de <component>
		}],

		compile: function($element, $attrs) {
			
			return {
				post: function($scope, $element) {
					console.log($scope.id, $scope.language);
					$scope.$parent.$watch('data.i18n["' + $scope.language + '"]["' + $scope.id + '"]', function(string) {
						var compiled = $compile('<div>' + string + '</div>')($scope);
						$element.empty().append(compiled.contents());
					});
				}
			}
		}
	};
}]);