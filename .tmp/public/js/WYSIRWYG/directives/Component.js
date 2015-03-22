angular.module('WYSIRWYG.Component', ['WYSIRWYG.i18n', 'WYSIRWYG.data'])

.directive('component', ['$compile', function($compile) {
	'use strict';

	return {
		restrict: 'E',
		transclude: true,
		scope: {
			id: '@',
			language: '@'
		},

		link: function($scope, $element) {

			var id = $scope.id,
				utils = WYSIRWYG.Component.utils,
				base = WYSIRWYG.Component.getData(id),
				local = utils.getProp($scope.$parent.data, 'components.' + id);

			// when changes occurs on base:
			WYSIRWYG.Component
				.watch(id, function(data) {
					$scope.data = $.extend(true, {}, data.new[id], local);
					$scope.$apply();
				});

			// re-render on template changes
			$scope.$watch('data.template', function(new_template) {
				new_template = new_template || '';
				var compiled = $compile('<div>' + new_template + '</div>')($scope);

				$element
					.empty()
					.append(compiled.contents());
			});

			$scope.data = $.extend(true, {}, base, local);

		}
	};
}]);