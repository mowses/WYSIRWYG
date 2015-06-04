'use strict';

angular.module('WYSIRWYG', [
	'WYSIRWYG.Grid',
	'WYSIRWYG.EditableArea',
	'WYSIRWYG.Component',
	//'WYSIRWYG.Selectable',
	//'WYSIRWYG.Sortable',
	'WYSIRWYG.Draggable',
	'WYSIRWYG.Resizable',
	'WYSIRWYG.BoundingBox',
	'WYSIRWYG.Components.Controllers',
	'ngModelUtils',
	'Debug'
])

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

.factory('generateCSS', function() {
	return function(id, jss) {
		var css = JSS.toCSS(jss),
			head = $('head'),
			style = (css ? $('<style id="' + id + '">' + css + '</style>') : $(null));

		head
			.find('style#' + id)
			.remove()
			.end()
			.append(style);
	}
})

.factory('mergeReferences', function() {
	function mergeReferences(components, path) {
		$.each(components || [], function(k, component) {
			var _path = !path ? k : path + '.components.' + k;
			mergeReferences(component.components, _path);
			if (component.reference) {
				$.extend(true, component, WYSIRWYG.Component.getData(component.reference), WYSIRWYG.Component.getData(_path));
			}
		});
	}

	return function(components, path) {
		return mergeReferences(components, path);
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

.controller('AppController', ['$scope', 'getComponents', 'getScopes', 'mergeReferences', function($scope, getComponents, getScopes, mergeReferences) {

	$scope.Component = WYSIRWYG.Component;
	$scope.data = {
		components: null
	};

	$scope.Component.watch(null, function(data) {
		$scope.data.components = $.extend(true, $scope.data.components || {}, data.diff);
		mergeReferences($scope.data.components);
		$scope.$apply();
	});

	getComponents();

	console.log('para acessar $scope use a variavel global $scope, getScopes');
	window.$scope = $scope;
	window.getScopes = getScopes;

}])

.controller('ComponentsEditController', ['$scope', 'getComponents', 'generateCSS', 'mergeReferences', function($scope, getComponents, generateCSS, mergeReferences) {
	var stringify = JSON.stringify,
		deleteProperties = delete_properties;

	$scope.stringToData = function(str) {
		if ($.type(str) != 'string') return {};

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

		$.each(diff_data, function(k, component) {
			if ($scope.data.components && $scope.data.components[k]) return;

			var new_data = data.new[k];

			if (new_data.data !== undefined) {
				component.dataStringified = stringify(new_data.data);
			}

			if (new_data.i18n !== undefined) {
				component.i18nStringified = stringify(new_data.i18n);
			}

			if (new_data.styles !== undefined) {
				component.stylesStringified = stringify(new_data.styles);
			}

			if (new_data.components !== undefined) {
				component.componentsStringified = stringify(new_data.components);
			}
		});

		$scope.data.components = $.extend(true, $scope.data.components || {}, diff_data);
		mergeReferences($scope.data.components);
		$scope.$apply();
	})
	.watch(null, function(data) {
		$.each(data.deleted || [], function(k) {
			generateCSS(k, null);
		});
		$.each(data.new || [], function(k, data) {
			generateCSS(k, data.styles);
		});
	});

	getComponents();

	console.log('para acessar $scope use a variavel global $scope');
	window.$scope = $scope;

}]);