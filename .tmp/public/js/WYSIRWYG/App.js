angular.module('WYSIRWYG', ['WYSIRWYG.Stage'])

.controller('App', ['$scope', function($scope) {
	'use strict';

	var socket = io.socket;

	socket
	.on('connect', function() {
		socket.get('/components', function(data) {
			var components = WYSIRWYG.Component.getData();

			$.each(data, function(i, component) {
				components[component.name] = component;
			});
		});
	});

	console.log('para acessar $scope use a variavel global $App');
	window.$App = $scope;

}]);