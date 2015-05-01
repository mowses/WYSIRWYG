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
				recompile = false,
				css = $element.css(['position']);

			if (!defined_draggable && $.inArray(css.position, ['absolute', 'fixed']) >= 0) {
				recompile = true;
				$element.attr('draggable', '');
			}
			if (!defined_resizable) {
				recompile = true;
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