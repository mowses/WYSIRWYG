'use strict';

angular.module('WYSIRWYG', ['WYSIRWYG.Stage'])

.controller('Main', ['$scope', function($scope) {



	console.log('para acessar $scope use a variavel global $scope');
	window.$scope = $scope;

}]);