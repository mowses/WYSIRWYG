angular.module('WYSIRWYG.data', [])

.directive('data', ['$compile', function($compile) {
	'use strict';

	return {
		restrict: 'E',
		transclude: true,
		//require: '^component',
		scope: {
			id: '@'
		},

		link: function($scope, $element) {
			var parent_component = $scope.$parent,
				data = parent_component.data.data,
				index = $scope.id;

			// watch for parent component changes
			parent_component.$watch('data.data["' + index + '"]', function(data) {
				$element
					.empty()
					.append(data);
			});
		}
	};
}]);