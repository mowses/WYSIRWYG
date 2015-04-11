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

	$scope.Component.watch(null, function(data) {
		$scope.data.components = $.extend(true, $scope.data.components || {}, data.diff);
		$scope.$apply();
		console.log('values changed', data.diff);
	});

	getComponents();

	console.log('para acessar $scope use a variavel global $App');
	window.$App = $scope;

}])

.controller('ComponentsEditController', ['$scope', 'getComponents', function($scope, getComponents) {
	var stringify = JSON.stringify,
		deleteProperties = delete_properties;

	$scope.stringToData = function(str) {
		if ($.type(str) != 'string') return;

		var data = JSON.parse(str);

		return data;
	};

	$scope.Component = WYSIRWYG.Component;
	$scope.data = {
		components: null
	};

	$scope.Component.watch(null, function(data) {
		var diff_data = $.extend(true, {}, data.diff);

		$scope.data.components = deleteProperties($scope.data.components, data.deleted || {});
		
		$.each(diff_data, function(i, component) {
			if ($scope.data.components && $scope.data.components[i]) return;
			
			var new_data = data.new[i];

			if (new_data.data !== undefined) {
				component.dataStringified = stringify(new_data.data);
			}

			if (new_data.i18n !== undefined) {
				component.i18nStringified = stringify(new_data.i18n);
			}

			if (new_data.components !== undefined) {
				component.componentsStringified = stringify(new_data.components);
			}
		});

		$scope.data.components = $.extend(true, $scope.data.components || {}, diff_data);
		$scope.$apply();
	});

	getComponents();

	console.log('para acessar $scope use a variavel global $App');
	window.$App = $scope;

}]);