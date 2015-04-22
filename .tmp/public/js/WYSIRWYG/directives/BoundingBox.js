angular.module('WYSIRWYG.BoundingBox', [])

.directive('boundingBox', [function() {
	'use strict';

	// get ui options
	/*var options = $.ui.resizable.prototype.options,
		scope = {};*/

	return {
		restrict: 'A',
		transclude: false,
		priority: -1000,
		
		compile: function($element, $attrs) {

			console.log($element.html());
			return {
				pre: function($scope, $element, $attrs) {

				},

				post: function($scope, $element) {
					$element
					.resizable({
						handles: $attrs.bbHandles
					});
				}
			};
		}
	};
}]);