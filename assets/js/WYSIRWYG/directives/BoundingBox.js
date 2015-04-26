angular.module('WYSIRWYG.BoundingBox', [])

.directive('boundingBox', ['$compile', function($compile) {

	return {
		restrict: 'A',
		transclude: false,
		priority: -1000,

		compile: function($element, $attrs) {
			var isDefined = angular.isDefined,
				defined_draggable = isDefined($attrs['draggable']),
				defined_resizable = isDefined($attrs['resizable']),
				recompile = !defined_draggable || !defined_resizable;

			if (!defined_draggable) {
				$element.attr('draggable', '');
			}
			if (!defined_resizable) {
				$element.attr('resizable', '');
			}
			if (recompile) {
				$element.removeAttr('bounding-box');
			}

			return {
				pre: function($scope, $element, $attrs) {
					if (recompile) {
						$compile($element)($scope);
					}
				},

				post: function($scope, $element) {
					
				}
			};
		}
	};
}]);