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

		controller: ['$scope', function($scope) {
			var parent = $scope.$parent && $scope.$parent.data;

			$scope.getTemplate = function() {
				var local = $scope.data.local || {},
					base = $scope.data.base || {};

				return (local.template || base.template || '');
			}

			// initialize scope vars
			
			// base data comes directly from WYSIRWYG.Component.getData($scope.id)
			// local data means when this is a subcomponent and it's data is located inside its parent component
			// local data represents the current component data (when it is inside a parent component)
			$scope.data = {
				base: null,
				local: null
			};

			// listen for changes...
			if (parent) {
				$scope.$parent.$watch('data.base.components["' + $scope.id + '"]', function(new_data) {
					$scope.data.local = new_data;
					console.log($scope.id, new_data, $scope.$parent.data);
				}, true);
			}

			// when changes occurs on base:
			WYSIRWYG.Component
				.watch($scope.id, function(data) {
					$scope.data.base = data.new[$scope.id];
					$scope.$apply();
				});

			$scope.$watch('id', function(id) {
				$scope.data.base = WYSIRWYG.Component.getData(id);
			});
			// watch for data change
			$scope.$watch('data.base.template', function() {
				$scope.template = $scope.getTemplate();
			});
			$scope.$watch('data.local.template', function() {
				$scope.template = $scope.getTemplate();
			});
			// parent watch
			$scope.$parent.$watch('language', function(new_language) {
				$scope.language = $scope.language || new_language;
			});
		}],

		link: function($scope, $element) {

			// re-compile on template changes
			$scope.$watch('template', function(new_template) {
				var compiled = $compile('<div>' + new_template + '</div>')($scope);

				$element
					.empty()
					.append(compiled.contents());
			});

			/*// watch changes for the local component on `template` property
			parent_component.$watch('data.components["' + id + '"].template', function(new_template, old_template) {
				
				// need to check `new_template` with `old_template`
				// because is re-setting child components template property 
				// maybe check `new_template` against `undefined` values too?
				// I dont know if it's an Angular bug because:
				// 1: both new and old values are undefined, so it should not run $watch
				// 2: we are changing parent_component template not the template from the current scope
				if (new_template === old_template) return;

				$scope.data.template = new_template;
			});*/

		}
	};
}]);