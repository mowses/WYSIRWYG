'use strict';

angular.module('WYSIRWYG.modules.RawEditor', [
	'WYSIRWYG.Component',
	//'WYSIRWYG.Selectable',
	//'WYSIRWYG.Sortable',
	'WYSIRWYG.Components.Controllers',
	'ngModelUtils',
	'Debug'
])
.controller('RawEditorController', ['$scope', 'getComponents', 'generateCSS', 'mergeReferences', function($scope, getComponents, generateCSS, mergeReferences) {
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