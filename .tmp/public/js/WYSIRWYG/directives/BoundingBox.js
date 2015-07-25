angular.module('WYSIRWYG.BoundingBox', [])

.directive('boundingBox', ['$compile', function($compile) {
	'use strict';

	return {
		restrict: 'AE',
		transclude: true,
		template: '<div ng-transclude></div>',
		
		controller: ['$scope', function($scope) {
			
		}],

		compile: function($element, attrs) {
			
			return {
				pre: function(scope, $element, attrs) {
					
				},
				post: function(scope, $element, attrs) {
					
				}
			}
		}
	};
}]);