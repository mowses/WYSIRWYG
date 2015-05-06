'use strict';

angular.module('WYSIRWYG', [
	'WYSIRWYG.Grid',
	'WYSIRWYG.EditableArea',
	'WYSIRWYG.Component',
	//'WYSIRWYG.Selectable',
	//'WYSIRWYG.Sortable',
	'WYSIRWYG.Draggable',
	//'WYSIRWYG.Resizable',
	'WYSIRWYG.BoundingBox',
	'WYSIRWYG.Components.Controllers',
	'ngModelUtils',
	'Debug'
])

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

/**
 * get attributes in @attrs that its property name prefixes @prefix
 */
/*.factory('getAttributes', function() {
	function getAttributes(prefix, attrs) {

		var filtered_attrs = {},
			prefix_len = prefix.length;
		
		$.each(attrs, function(name, attr) {
			var index = name.indexOf(prefix);
			if (index !== 0) return;

			var prop_name = name.substr(prefix_len,1).toString().toLowerCase() + name.substr(prefix_len + 1);

			// parse attr to correct data type
			if (attr === 'true') {
				attr = true;
			} else if (attr === 'false') {
				attr = false;
			} else if ($.isNumeric(attr)) {
				attr = parseFloat(attr);
			}

			filtered_attrs[prop_name] = attr;
		});

		return filtered_attrs;
	}

	return function(prefix, attrs) {
		return getAttributes(prefix, attrs);
	}
})*/

.controller('AppController', ['$scope', 'getComponents', 'getScopes', function($scope, getComponents, getScopes) {

	$scope.Component = WYSIRWYG.Component;
	$scope.data = {
		components: null
	};

	$scope.Component.watch(null, function(data) {
		$scope.data.components = $.extend(true, $scope.data.components || {}, data.diff);
		$scope.$apply();
	});

	getComponents();

	console.log('para acessar $scope use a variavel global $scope, getScopes');
	window.$scope = $scope;
	window.getScopes = getScopes;

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

	console.log('para acessar $scope use a variavel global $scope');
	window.$scope = $scope;

}]);