angular.module('WYSIRWYG.data', [])

.directive('data', ['$compile', '$interpolate', function($compile, $interpolate) {
	'use strict';

	return {
		restrict: 'E',
		transclude: false,
		scope: {
			id: '@',
			filter: '@',
			data: '='
		},

		controller: ['$scope', function($scope) {

		}],

		compile: function($element, attrs) {
			attrs.data = attrs.data || 'data.data';

			function prepareData(data) {
				return data
					.replace(/"/g, '\\"')
					.replace(/\{/g, '\\{')
					.replace(/\}/g, '\\}');
			}

			return {
				post: function(scope, $element) {
					scope.$watch('data["' + scope.id + '"]', function(new_data) {
						//console.log('data changed', 'data["' + scope.id + '"]', scope, attrs);
						var filter = scope.filter,
							data = new_data;

						if (filter) {
							data = $interpolate('{{"' + prepareData(data) + '" | ' + scope.filter + '}}');
						}
						
						$element.empty().append(data);
					});
				}
			}
		}
	};
}]);