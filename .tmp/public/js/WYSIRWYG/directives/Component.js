angular.module('WYSIRWYG.Component', ['WYSIRWYG.i18n', 'WYSIRWYG.data'])

.directive('component', ['$compile', function($compile) {
	'use strict';

	return {
		restrict: 'E',
		transclude: true,
		scope: {
			id: '@'
		},

		controller: ['$scope', '$element', function($scope, $element) {

			//setTimeout(function() {
				var utils = WYSIRWYG.Component.utils;

				function render() {
					var id = $scope.id,
						base = WYSIRWYG.Component.getData(id),
						local = utils.getProp($scope.$parent.data, 'components.' + id),
						component_data = $.extend(true, {}, base, local),
						template = component_data.template,
						compiled;

					$.extend($scope, {
						data: component_data
					});
					compiled = $compile('<div>' + template + '</div>')($scope);

					$element
						.empty()
						.append(compiled.contents());
				}

				// when changes occurs on base:
				WYSIRWYG.Component.watch($scope.id, function(data) {
console.log('something changed on base');
					render();
				});

				// when changes occurs locally:
				$scope.$parent.$watch('data.components.' + $scope.id, function() {
console.log('something changed locally');
					render();
				}, true);
		//}, 3000);
			
		}]
	};
}]);