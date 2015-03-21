angular.module('WYSIRWYG', ['WYSIRWYG.Stage'])

.controller('App', ['$scope', function($scope) {
	'use strict';

	var socket = io.socket;

	$scope.data = {
		Components: {}
	};

	socket
	.on('connect', function() {
		socket.get('/components', function(data) {
			// index data by name
			var indexed_data = {};
			$.each(data, function(i, component) {
				var key = component.name;
				if (!key) return;

				indexed_data[key] = component;
			});

			$scope.data.Components = indexed_data;
			$scope.$apply();
		});
	});

	console.log('para acessar $scope use a variavel global $App');
	window.$App = $scope;

}]);