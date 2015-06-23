// ATENCAO: este módulo NÃO foi utilizado ObserverCore propositalmente
// só pra ter uma ideia do que seria não usa-lo...

'use strict';

angular.module('WYSIRWYG.modules.Editor.Raw', [
	'WYSIRWYG.Components.Controllers',
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
			component.dataStringified = stringify(component.data);
			component.i18nStringified = stringify(component.i18n);
			component.stylesStringified = stringify(component.styles);
			component.componentsStringified = stringify(component.components);
			component.themes = getThemes(component);
		});

		$scope.$apply();
	});

	console.log('para acessar $scope use a variavel global $scope');
	window.$scope = $scope;

}]);