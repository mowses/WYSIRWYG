'use strict';

angular.module('WYSIRWYG.Ruler', [])

.directive('ruler', [function() {

	function range(min, max, step) {
		step = step || 1;
		min = parseFloat(min);
		max = parseFloat(max);
		step = parseFloat(step);
		var input = [];

		for (var i = min; i <= max; i += step) {
			input.push(i);
		}

		return input;
	}

	return {
		restrict: 'E',
		transclude: false,
		scope: {
			from: '@',
			to: '@',
			step: '@',
			orientation: '@'
		},

		controller: ['$scope', '$attrs', function($scope, attrs) {

			$scope.range = range($scope.from, $scope.to, $scope.step);

			$scope.floatingMarker = {
				x: 0,
				y: 0
			};
		}],

		compile: function($element, $attrs) {

			return {
				pre: function($scope, $element, $attrs) {
					$element.addClass($attrs.orientation + '-ruler');
				},

				post: function($scope, $element) {
				}
			};
		},

		template: '<div class="floating-marker" style="top: {{floatingMarker.y}}px; left: {{floatingMarker.x}}px;"></div><div class="step" ng-repeat="n in range">{{n}}</div>'
	};
}]);