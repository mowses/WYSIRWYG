angular.module('WYSIRWYG.Component', ['WYSIRWYG.i18n', 'WYSIRWYG.data'])

.directive('component', ['$compile', function($compile) {
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
			//console.log($scope.id, $scope.data);
			$scope.language = $scope.language || Object.keys($scope.data.i18n)[0];
			
		}],

		compile: function($element, $attrs) {
			$attrs.data = $attrs.data || 'data.components["' + $attrs.id + '"]';

			return {
				pre: function($scope, $element, $attrs) {
					
				},

				post: function($scope, $element) {
					$scope.$watch('data.template', function(new_template) {
						var compiled = $compile('<div>' + new_template + '</div>')($scope);
						$element.empty().append(compiled.contents());
					});
				}
			};
		}
	};
}]);