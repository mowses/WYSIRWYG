angular.module('WYSIRWYG.Stage', ['WYSIRWYG.Component'])

.directive('stage', ['$compile', function($compile) {
	'use strict';

	return {
		restrict: 'E',
		transclude: true,
		scope: {

		},

		controller: ['$scope', '$element', function($scope, $element) {
			$scope.stage = new WYSIRWYG.Stage()
				.watch(null, function(data) {
					var stage = this;

					stage.data = data.new;

					// apply changes
					$scope.$apply();
				});

			$scope.stage.add({
				template: '<b>olá</b> <component data="components[0]"></component> mundo',
				components: [{
					template: '<div>the world is mine <b><component data="components[0]"></component></b></div>',
					components: [{
						template: 'foolish <u>{{cocoroni}}</u> bright',
						cocoroni: 'meca'
					}]
				}]
			});

			console.log('para acessar stage use a variavel global stage');
			window.stage = $scope.stage;
		}],
		templateUrl: '/js/libraries/WYSIRWYG/templates/stage.html'
	};
}]);