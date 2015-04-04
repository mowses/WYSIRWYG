'use strict';

angular.module('WYSIRWYG', ['WYSIRWYG.Component', 'WYSIRWYG.Components.Controllers', 'ngModelUtils'])

.factory('getComponents', function() {
	
	function mergeReferences(components) {
		$.each(components || [], function(i, component) {
			mergeReferences(component.components);
			if (component.reference) {
				$.extend(true, component, WYSIRWYG.Component.getData(component.reference), component);
			}
		});
	}

	return function() {
		var socket = io.socket;

		socket.on('connect', function() {
			socket.get('/components', function(data) {
				var components = WYSIRWYG.Component.getData();

				$.each(data, function(i, component) {
					components[component.name] = component;
				});

				mergeReferences(components);
			});
		});
	}
})

.factory('getParentLanguage', function() {
	function getParentLanguage(scope) {
		if (scope.language) return scope.language;
		if (!scope.$parent) return;

		return getParentLanguage(scope.$parent);
	}

	return function(scope) {
		return getParentLanguage(scope);
	}
})

.controller('AppController', ['$scope', 'getComponents', function($scope, getComponents) {

	$scope.Component = WYSIRWYG.Component;
	$scope.data = {
		components: null
	};

	WYSIRWYG.Component.watch(null, function(data) {
		$scope.data.components = $.extend(true, $scope.data.components || {}, data.diff);
		$scope.$apply();
		console.log('values changed', data.diff);
	});

	getComponents();

	console.log('para acessar $scope use a variavel global $App');
	window.$App = $scope;

}])

.controller('ComponentsEditController', ['$scope', 'getComponents', function($scope, getComponents) {

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