angular.module('WYSIRWYG.i18n', [])

.directive('i18n', ['$compile', function($compile) {
	'use strict';

	return {
		restrict: 'E',
		transclude: true,
		require: '^component',
		scope: {
			id: '@',
			language: '@'
		},

		controller: ['$scope', '$element', function($scope, $element) {
			var component_scope = $scope.$parent,
				i18n_data = component_scope.data.i18n,
				language = $scope.language || Object.keys(i18n_data)[0],
				i18n = i18n_data[language] || {},
				index = $scope.id,
				compiled = $compile('<div>' + i18n[index] + '</div>')(component_scope);

			$element
				.empty()
				.append(compiled.contents());
		}]
	};
}]);