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
				top: 0,
				left: 0
			};

			$scope.$watch('floatingMarker', function(new_value) {
				switch($scope.orientation) {
					case 'vertical':
						new_value.left = 0;
					break;
					case 'horizontal':
						new_value.top = 0;
					break;
					default:
				}
			}, true);
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

		template: '<div class="floating-marker" style="top: {{floatingMarker.top}}px; left: {{floatingMarker.left}}px;"></div><div class="step" ng-repeat="n in range">{{n}}</div>'
	};
}]);