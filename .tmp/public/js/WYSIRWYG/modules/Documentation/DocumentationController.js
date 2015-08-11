'use strict';

angular.module('WYSIRWYG.modules.documentation', [
    'WYSIRWYG.services.debug',
    'WYSIRWYG.services.getComponents',
    'WYSIRWYG.services.generateCSS',
    'WYSIRWYG.directives.component',
    'WYSIRWYG.directives.i18n',
    'WYSIRWYG.filters.jsonFormatter'
])

.controller('DocumentationController', ['$scope', 'getComponents', 'getScopes', 'generateCSS', function($scope, getComponents, getScopes, generateCSS) {
	$scope.data = {
		components: {
			"1": {
				description: "Just a simple component with data, i18n and themes."
			},
			"2": {
				description: "This is a component with a subcomponent"
			},
			"3": {
				description: "This example shows a component with a subcomponent that contains another subcomponent inside it..."
			},
			"6": {
				description: "Example showing how to override a component and its subcomponents template, data, i18n and themes."
			},
			"7": {
				description: "Example showing how to replace a subcomponent by another."
			}
		}
	};

	getComponents(Object.keys($scope.data.components), function(data) {
		// generate CSS
		$.each(data, function(i, component) {
			generateCSS('component-' + component.id, component.styles);
		});

		$.extend(true, $scope.data.components, data);
	
		$scope.$digest();
	});

	console.log('para acessar $scope use a variavel global $scope, getScopes');
	window.$scope = $scope;
	window.getScopes = getScopes;

}]);