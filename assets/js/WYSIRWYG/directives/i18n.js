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
					// hold child scope - used by the compiled sub-components
					// and destroyed on data change
					// preventing memory leaks
					$scope.childScope = $scope.$parent.$new();

					$scope.$watch('data["' + $attrs.language + '"]["' + $scope.id + '"]', function(string) {
						// destroy previous child scope
						$scope.childScope.$destroy();
						// create a new child scope for sub-components
						$scope.childScope = $scope.$parent.$new();
						//console.log('i18n changed:', $attrs.id, $scope, $scope.$parent, $scope.childScope);
						var compiled = $compile('<div>' + string + '</div>')($scope.childScope);
						$element.empty().append(compiled.contents());
					});
				}
			}
		}
	};
}]);