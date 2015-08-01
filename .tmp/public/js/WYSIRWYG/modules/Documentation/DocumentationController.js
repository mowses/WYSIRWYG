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
		components: {}
	};

	getComponents([1], function(data) {
		$scope.data.components = data;

		// generate CSS
		$.each(data, function(i, component) {
			generateCSS('component-' + component.id, component.styles);
		});

		//$scope.$apply();
	});

	console.log('para acessar $scope use a variavel global $scope, getScopes');
	window.$scope = $scope;
	window.getScopes = getScopes;

}]);