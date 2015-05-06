angular.module('WYSIRWYG.BoundingBox', [])

.directive('boundingBox', ['$compile', function($compile) {
	'use strict';

	return {
		restrict: 'E',
		transclude: false,
		
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