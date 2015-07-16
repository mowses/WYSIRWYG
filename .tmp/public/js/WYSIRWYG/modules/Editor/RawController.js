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
.controller('RawEditorController', ['$scope', '$timeout', 'getComponents', 'generateCSS', 'getThemes', 'getLanguages', '$http', '$ionicActionSheet', '$ionicPopup', function($scope, $timeout, getComponents, generateCSS, getThemes, getLanguages, $http, $ionicActionSheet, $ionicPopup) {
	var stringify = JSON.stringify,
		deleteProperties = delete_properties;

	function refresh(component) {
		component.themes = getThemes(component);
		component.languages = getLanguages(component);

		// generate css for all components
		// should generate all CSSs at once because a component can use subcomponents
		// which uses his own theme, and it should be already generated
		generateCSS('component-' + component.id, component.styles);
	}

	$scope.newComponent = function() {
		$scope.openEdition({
			id: undefined,
			template: 'your HTML here',
			stringified: {
				template: 'your HTML here'
			}
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
		if (str === null || str === '') return null;
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
		$scope.editingComponent = $.extend(true, {},
			component, {
			stringified: {
				template: component.template,
				data: component.data ? stringify(component.data, null, '\t') : null,
				i18n: component.i18n ? stringify(component.i18n, null, '\t') : null,
				styles: component.styles ? stringify(component.styles, null, '\t') : null
			}
		});

		$scope.editingComponent.$original = component;  // nao colocar $original junto do $extend
	};

	// keep editingComponent styles always updated
	$scope.$watch('editingComponent.styles', function(styles) {
		var component = $scope.editingComponent;
		if (!component || !styles) return;

		component.themes = getThemes(component);
		$scope.generateCSS('editing-component', styles);
	}, true);

	// keep editingComponent styles always updated
	$scope.$watch('editingComponent.i18n', function(i18n) {
		var component = $scope.editingComponent;
		if (!component || !i18n) return;

		component.languages = getLanguages(component);
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

		var editing = $scope.editingComponent,
			component_data = {
				id: editing.id,
				name: editing.name,
				template: editing.template,
				data: editing.data,
				i18n: editing.i18n,
				styles: editing.styles
			};

		$http({
			method: (editing.id === undefined ? 'POST' : 'PUT'),
			url: '/components',
			data: {
				component: component_data
			}
		})
		.success(function() {
			$.extend(editing.$original, component_data);
			refresh(editing.$original);

			$scope.editingComponent = null;
		})
		.error(function(data) {
			console.log('foo errorr', data);
		});
	};

	/**
	 * apply changes to editing component based on section
	 * called from views/raweditor/index.ejs
	 */
	$scope.applyChanges = (function() {
		var last_timeout;

		return function($value, section, delay) {
			$timeout.cancel(last_timeout);

			last_timeout = $timeout(function() {
				switch(section) {
					case 'preview':
						return;

					case 'template':
						$scope.editingComponent.template = $value;
						return;

					default:
						$scope.editingComponent[section] = $scope.stringToData($value);
				}
			}, delay);
		}
	})();

	getComponents(function(components) {
		$scope.data.components = components;

		$.each($scope.data.components, function(i, component) {
			refresh(component);
		});

		$scope.$apply();
	});

	console.log('para acessar $scope use a variavel global $scope');
	window.$scope = $scope;

}]);