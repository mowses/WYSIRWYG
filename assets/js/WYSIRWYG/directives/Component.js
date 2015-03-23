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

			var parent_component = $scope.$parent,
				id = $scope.id,
				language = $scope.language || parent_component.language,
				utils = WYSIRWYG.Component.utils,
				getLocal = function() {
					return utils.getProp(parent_component.data, 'components.' + id);
				};

			// when changes occurs on base:
			WYSIRWYG.Component
				.watch(id, function(data) {
					$scope.data = $.extend(true, {}, data.new[id], getLocal());
					$scope.$apply();
				});

			$scope.data = $.extend(true, {}, WYSIRWYG.Component.getData(id), getLocal());

			// re-compile on template changes
			$scope.$watch('data.template', function(new_template, old) {
				new_template = new_template || '';
				var compiled = $compile('<div>' + new_template + '</div>')($scope);

				$element
					.empty()
					.append(compiled.contents());
			});

			// watch changes for the local component on `template` property
			parent_component.$watch('data.components["' + id + '"].template', function(new_template, old_template) {
				
				// need to check `new_template` with `old_template`
				// because is re-setting child components template property 
				// maybe check `new_template` against `undefined` values too?
				// I dont know if it's an Angular bug because:
				// 1: both new and old values are undefined, so it should not run $watch
				// 2: we are changing parent_component template not the template from the current scope
				if (new_template === old_template) return;

				$scope.data.template = new_template;
			});

		}
	};
}]);