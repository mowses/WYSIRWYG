angular.module('WYSIRWYG.i18n', [])

.directive('i18n', ['$compile', function($compile) {
	'use strict';

	return {
		restrict: 'E',
		transclude: true,
		//require: '^component',
		scope: {
			id: '@',
			language: '@'
		},

		link: function($scope, $element) {
			var parent_component = $scope.$parent,
				i18n_data = parent_component.data.i18n,
				language = $scope.language || parent_component.language || Object.keys(i18n_data)[0],
				i18n = i18n_data[language] || {},
				index = $scope.id;

			parent_component.$watch('data.i18n["' + language + '"]["' + index + '"]', function(data) {
				var compiled = $compile('<div>' + data + '</div>')(parent_component);
				$element
					.empty()
					.append(compiled.contents());
			});
		}
	};
}]);