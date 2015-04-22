angular.module('WYSIRWYG.Draggable', [])

.directive('draggable', [function() {
	'use strict';

	return {
		restrict: 'A',
		transclude: false,
		priority: -1000,
		
		compile: function($element, $attrs) {
			
			return {
				pre: function($scope, $element, $attrs) {
					
				},

				post: function($scope, $element) {
					$element
					.draggable({
						delay: $attrs.dragDelay
					});
				}
			};
		}
	};
}]);