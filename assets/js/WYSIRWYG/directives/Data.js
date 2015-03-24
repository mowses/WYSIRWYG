angular.module('WYSIRWYG.data', [])

.directive('data', ['$compile', function($compile) {
	'use strict';

	return {
		restrict: 'E',
		transclude: true,
		scope: {
			id: '@'
		},

		controller: ['$scope', function($scope) {
			$scope.getData = function() {
				var id = $scope.id,
					local = ($scope.$parent.data.local || {}).data || {},
					base = ($scope.$parent.data.base || {}).data || {};

				return (local[id] || base[id]);
			}

			// watch for base data changes
			$scope.$parent.$watch('data.base.data["' + $scope.id + '"]', function() {
				$scope.data = $scope.getData();
			});

			// watch for local data changes
			$scope.$parent.$watch('data.local.data["' + $scope.id + '"]', function() {
				$scope.data = $scope.getData();
			});
		}],

		link: function($scope, $element) {
			$scope.$watch('data', function(new_data) {
				$element
					.empty()
					.append(new_data);
			});
		}
	};
}]);