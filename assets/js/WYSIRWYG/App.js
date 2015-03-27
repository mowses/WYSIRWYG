'use strict';

angular.module('WYSIRWYG', ['WYSIRWYG.Component', 'ngModelUtils'])

.factory('getComponents', function() {
	return function() {
		var socket = io.socket;

		socket.on('connect', function() {
			socket.get('/components', function(data) {
				var components = WYSIRWYG.Component.getData();

				$.each(data, function(i, component) {
					components[component.name] = component;
				});
			});
		});
	}
})

.controller('App', ['$scope', 'getComponents', function($scope, getComponents) {

	$scope.Component = WYSIRWYG.Component;
	$scope.data = {
		components: null
	};

	$scope.getParentLanguage = function(scope) {
		if (scope.language) return scope.language;
		if (!scope.$parent) return;

		return $scope.getParentLanguage(scope.$parent);
	}

	WYSIRWYG.Component.watch(null, function(data) {
		$scope.data.components = data.new;
		console.log('all the data', $scope.data);
		$scope.$apply();
	});
	
	getComponents();

	console.log('para acessar $scope use a variavel global $App');
	window.$App = $scope;

}])

.controller('ComponentsEdit', ['$scope', 'getComponents', function($scope, getComponents) {
	
	getComponents();

	$scope.WYSIRWYG = WYSIRWYG;
	$scope.stringToData = function(str) {
		if ($.type(str) != 'string') return;

		var data = JSON.parse(str);
		
		return data;
	};

	WYSIRWYG.Component.watch(null, function(data) {
		var stringify = JSON.stringify;
		$scope.Component = $.extend(true, {}, data.new);
		$.each($scope.Component, function(i, component) {
			component.data = stringify(component.data);
			component.i18n = stringify(component.i18n);
			component.components = stringify(component.components);
		});
		$scope.$apply();
	});

	$scope.Component = WYSIRWYG.Component.getData();

}]);