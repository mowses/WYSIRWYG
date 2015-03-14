'use strict';

angular.module('WYSIRWYG.Stage', ['WYSIRWYG.Component'])

.directive('stage', ['$compile', function($compile) {
	return {
		restrict: 'E',
		transclude: true,
		scope: {

		},
		/*link: function(scope, element, attr) {
			//element.append('foolish');
			//console.log('fooo');
			//$compile(element)(scope);
		},*/
		controller: ['$scope', '$element', '$sce', function($scope, $element, $sce) {
			$scope.stage = new WYSIRWYG.Stage()
				// watch for changes
				.watch(null, function(data) {
					var stage = this;

					stage.data = data.new;

					// convert modified html into trusted html content
					/*$.each(data.diff.components, function(i, component) {
						stage.data.components[i].html = $sce.trustAsHtml(component.html);
					});*/

					// apply changes
					$scope.$apply();
				});

			$scope.stage.add({
				html: '<b>olá</b> <component data="components[0]"></component> mundo',
				components: [{
					html: '<div>the world is mine <b><component data="components[0]"></component></b></div>',
					components: [{
						html: 'foolish <u>{{cocoroni}}</u> bright',
						cocoroni: 'meca'
					}]
				}]
			});

			console.log('para acessar stage use a variavel global stage');
			window.stage = $scope.stage;
		}],
		templateUrl: './assets/js/libraries/WYSIRWYG/templates/stage.html'
	};
}]);