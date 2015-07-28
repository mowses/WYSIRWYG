'use strict';

angular.module('WYSIRWYG.modules.documentation', [
    'WYSIRWYG.services.debug',
    'WYSIRWYG.services.getComponents',
    'WYSIRWYG.directives.component',
])

.controller('DocumentationController', ['$scope', 'getComponents', 'getScopes', function($scope, getComponents, getScopes) {
	$scope.data = {
		components: {}
	};

	getComponents([1], function(data) {
		$scope.data.components = data;
		//$scope.$apply();
	});

	console.log('para acessar $scope use a variavel global $scope, getScopes');
	window.$scope = $scope;
	window.getScopes = getScopes;

}]);