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
.controller('RawEditorController', ['$scope', 'getComponents', 'generateCSS', 'mergeReferences', 'getThemes', '$http', '$ionicActionSheet', '$ionicPopup', function($scope, getComponents, generateCSS, mergeReferences, getThemes, $http, $ionicActionSheet, $ionicPopup) {
	var stringify = JSON.stringify,
		deleteProperties = delete_properties;

	$scope.newComponent = function() {
		$scope.openEdition({
			new: true,
			name: null,
			template: 'your HTML here',
			data: {},
			i18n: {},
			styles: {},
			components: {},
			dataStringified: '{\r\t\r}',
			i18nStringified: '{\r\t\r}',
			stylesStringified: '{\r\t\r}',
			componentsStringified: '{\r\t\r}'
		});
	};

	/**
	 * show delete confirmation
	 */
	$scope.showDeleteConfirmation = function(component) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Delete confirmation',
			template: 'Are you sure you want to delete <strong>' + component.name + '</strong>?',
			okType: 'button-assertive',
		});
	
		confirmPopup.then(function(res) {
			if(res) {
				$http({
					method: 'DELETE',
					url: '/components',
					data: {
						ids: [component.id]
					}
				})
				.success(function() {
					
				})
				.error(function() {

				});
			} else {
				
			}
		});
	};

	$scope.openActionSheet = function(component) {
		$ionicActionSheet.show({
			titleText: 'Actions for ' + component.name,
			buttons: [
				//{ text: '<i class="icon ion-arrow-move"></i> Move' },
			],
			destructiveText: 'Delete',
			cancelText: 'Cancel',
			cancel: function() {
				//console.log('CANCELLED');
			},
			/*buttonClicked: function(index) {
				console.log('BUTTON CLICKED', index);
				return true;
			},*/
			destructiveButtonClicked: function() {
				$scope.showDeleteConfirmation(component);
				return true;
			}
		});
	};

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
	$scope.openEdition = function(component) {
		$scope.editingComponent = $.extend(true, {}, component);
	};

	// keep editingComponent styles always updated
	$scope.$watch('editingComponent.styles', function(styles) {
		var component = $scope.editingComponent;
		if (!component || !styles) return;

		component.themes = getThemes(component);
		$scope.generateCSS('editing-component', styles);
	}, true);

	/*
	 * if given group is the selected group, deselect it
	 * else, select the given group
	*/
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;

			// generate css for selected group
			generateCSS(group.name, group.styles);
		}
	};
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};

	$scope.acceptChanges = function(accept) {
		if (!accept) {
			$scope.editingComponent = null;
			return;
		}

		$http({
			method: ($scope.editingComponent.new ? 'POST' : 'PUT'),
			url: '/components',
			data: {
				component: $scope.editingComponent
			}
		})
		.success(function() {
			$scope.editingComponent = null;
		})
		.error(function(data) {
			console.log('foo errorr', data);
		});
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

	getComponents(function(data) {
		$scope.data.components = data;
		mergeReferences($scope.data.components);

		$.each($scope.data.components, function(i, component) {
			component.dataStringified = stringify(component.data, null, '\t') || '{\r\t\r}';
			component.i18nStringified = stringify(component.i18n, null, '\t') || '{\r\t\r}';
			component.stylesStringified = stringify(component.styles, null, '\t') || '{\r\t\r}';
			component.componentsStringified = stringify(component.components, null, '\t') || '{\r\t\r}';
			component.themes = getThemes(component);
		});

		$scope.$apply();
	});

	console.log('para acessar $scope use a variavel global $scope');
	window.$scope = $scope;

}]);