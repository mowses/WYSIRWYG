// ATENCAO: este módulo NÃO foi utilizado ObserverCore propositalmente
// só pra ter uma ideia do que seria não usa-lo...

'use strict';

angular.module('WYSIRWYG.modules.Editor.Raw', [
	'WYSIRWYG.Components.Controllers',
	'ionic',
	'ui.ace',
	'ngModelUtils',
	'Debug'
])
.controller('RawEditorController', ['$scope', 'getComponents', 'generateCSS', 'mergeReferences', 'getThemes', function($scope, getComponents, generateCSS, mergeReferences, getThemes) {
	var stringify = JSON.stringify,
		deleteProperties = delete_properties;

	$scope.stringToData = function(str) {
		if ($.type(str) != 'string') return {};

		var data = JSON.parse(str);

		return data;
	};

	$scope.generateCSS = function(id, style) {
		return generateCSS(id, style);
	};

	$scope.data = {
		components: null
	};

	// component edition
	$scope.editingComponent = null;
	$scope.editingComponentOriginal = null;
	$scope.openEdition = function(component) {
		$scope.editingComponent = $.extend(true, {}, component);
		$scope.editingComponentOriginal = component;
	};

	$scope.acceptChanges = function(accept) {
		if (accept) {
			$.extend($scope.editingComponentOriginal, $scope.editingComponent);
		}

		$scope.editingComponent = null;
		$scope.editingComponentOriginal = null;
	}

	/*$scope.Component.watch(null, function(data) {
			
		})
		.watch(null, function(data) {
			$.each(data.deleted || [], function(k) {
				generateCSS(k, null);
			});
			$.each(data.new || [], function(k, data) {
				generateCSS(k, data.styles);
			});
		});*/

	getComponents(['ResultBox', 'Searcher'], function(data) {
		$scope.data.components = data;
		mergeReferences($scope.data.components);

		$.each($scope.data.components, function(i, component) {
			component.dataStringified = stringify(component.data, null, '\t') || '{}';
			component.i18nStringified = stringify(component.i18n, null, '\t') || '{}';
			component.stylesStringified = stringify(component.styles, null, '\t') || '{}';
			component.componentsStringified = stringify(component.components, null, '\t') || '{}';
			component.themes = getThemes(component);
		});

		$scope.$apply();
	});

	console.log('para acessar $scope use a variavel global $scope');
	window.$scope = $scope;

}]);