angular.module('WYSIRWYG.i18n', [])

.directive('i18n', ['$compile', 'getParentLanguage', function($compile, getParentLanguage) {
	'use strict';

	return {
		restrict: 'E',
		transclude: false,
		scope: {
			id: '@',
			language: '@',
			data: '='
		},

		controller: ['$scope', function($scope) {
			
		}],

		compile: function($element, $attrs) {
			$attrs.data = $attrs.data || 'data.i18n';

			return {
				pre: function($scope, $element, $attrs) {
					$attrs.language = $attrs.language || getParentLanguage($scope.$parent);
					$attrs.language = $scope.data[$attrs.language] ? $attrs.language : Object.keys($scope.data)[0];
				},
				post: function($scope, $element, $attrs) {
					$scope.$watch('data["' + $attrs.language + '"]["' + $scope.id + '"]', function(string) {
						var compiled = $compile('<div>' + string + '</div>')($scope.$parent);
						$element.empty().append(compiled.contents());
					});
				}
			}
		}
	};
}]);