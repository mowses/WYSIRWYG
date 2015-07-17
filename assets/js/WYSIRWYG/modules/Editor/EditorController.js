'use strict';

angular.module('WYSIRWYG.modules.Editor', [
	'WYSIRWYG.Grid',
	'WYSIRWYG.Ruler',
	'WYSIRWYG.EditableArea',
	'WYSIRWYG.Component',
	//'WYSIRWYG.Selectable',
	//'WYSIRWYG.Sortable',
	'WYSIRWYG.Draggable',
	'WYSIRWYG.Resizable',
	'WYSIRWYG.BoundingBox',
	'WYSIRWYG.ElementScopeWatcher',
	'WYSIRWYG.Components.Controllers',
	'ngModelUtils',
	'Debug'
])
.controller('EditorController', ['$scope', 'getComponents', 'generateCSS', 'getThemes', 'getLanguages', function($scope, getComponents, generateCSS, getThemes, getLanguages) {

	// set directive watcher in the view, so every time updated theme should update bb
	$scope.updateResizable = function(scope, $element) {
		var css = $element.css(['display']);

		$.extend(true, scope.slide.boundingBox.resizable, {
			disabled: ($.inArray(css['display'], ['inline']) >= 0)
		});
	};

	$scope.checkDisableResizable = function(scope, $element) {

		if (scope.slide.selectedTheme) return;  // theme selected: no need to disable resizable

		$.extend(true, scope.slide.boundingBox.resizable, {
			disabled: true
		});
	};

	// set directive watcher in the view, so every time updated theme should update bb
	// @TODO: fix quando troca entre estilos com position relative > absolute (ja com elemento selecionado)
	// seleciona o componente, muda estilo pra que tenha position absolute.
	// deveria deixar drag só que nao...
	// e quando estiver em no theme nao pode deixar mover tbm...
	$scope.updateDraggable = function(scope, $element) {
		var css = $element.css(['position']);

		$.extend(true, scope.slide.boundingBox.draggable, {
			disabled: ($.inArray(css['position'], ['absolute', 'fixed']) == -1)
		});

		//console.log('carry on from here. position esta errado, porque $element ainda nao existe no DOM (acho q é isso). foo draggable ipdated', scope.slide.boundingBox.draggable.disabled, $element, css, scope.slide.component.styles['&.theme-default'].position);
	};

	$scope.getOffsetPosition = function(event) {
		var $element = $(event.delegateTarget),
			offset = $element.offset(),
			x = event.pageX - offset.left,
			y = event.pageY - offset.top;

		return {
			x: x,
			y: y
		};
	}

	$scope.data = {
		slides: {
		/* id: {
			name: null,
			selected: true,
			component: null
		}*/},
		components: {}
	};

	$scope.$watchCollection('data.components', function(data) {
		$.each(data, function(k, component) {
			var themes = getThemes(component),
				selected_theme = $scope.data.slides[k] && $scope.data.slides[k].selectedTheme || null;

			$scope.data.slides[k] = {
				name: component.name,
				selected: false,
				component: component,
				themes: themes,
				selectedTheme: selected_theme,
				boundingBox: {
					draggable: $.extend(true, {}, $scope.editableArea.draggable),
					resizable: $.extend(true, {}, $scope.editableArea.resizable)
				}
			};

			// generate css for all components
			// should generate all CSSs at once because a component can use subcomponents
			// which uses his own theme, and it should be already generated
			generateCSS('component-' + component.id, component.styles);
		});
	});

	$scope.grid = {
		grid: [50, 50]
	};

	// configs for draggable and resizable
	$scope.editableArea = {
		draggable: {
			appendTo: 'body',
			cursor: 'move',
			delay: 80,
			disabled: true,
			grid: $scope.grid.grid,
			// should not have `style` attribute setted on bounding-box
			stop: function(event, ui) {
				var element = ui.helper,
					scope = element.scope(),
					component = scope.slide.component,
					selected_theme = scope.slide.selectedTheme,
					current_theme = '&.' + selected_theme,
					styles = $.extend(true, {}, ui.position);

				if (selected_theme) {
					$.extend(true, component.styles[current_theme], styles);
				}

				element.attr('style', '');  // prevent having `style` attribute
				generateCSS('component-' + component.id, component.styles);
			}
		},
		resizable: {
			alsoResize: false,
			disabled: true,
			handles: 'all',
			grid: $scope.grid.grid,
			// should not have `style` attribute setted on bounding-box
			stop: function(event, ui) {
				// nao sei qual usar: ui.element ou ui.originalElement ????
				var element = ui.originalElement,
					scope = element.scope(),
					component = scope.slide.component,
					selected_theme = scope.slide.selectedTheme,
					current_theme = '&.' + selected_theme,
					styles = $.extend(true, {}, ui.position, ui.size);

				if (selected_theme) {
					$.extend(true, component.styles[current_theme], styles);
				}

				element.attr('style', '');  // prevent having `style` attribute
				generateCSS('component-' + component.id, component.styles);

			}/*,
			start: function(event, ui) {
				var instance = ui.element.resizable('instance'),
					width = instance.sizeDiff.width + ui.originalSize.width,
					height = instance.sizeDiff.height + ui.originalSize.height;

				ui.originalSize._bkp = {
					width: ui.originalSize.width,
					height: ui.originalSize.height
				};
				ui.originalSize.width = width;
				ui.originalSize.height = height;
				ui.size.width = undefined;
				ui.size.height = undefined;
			},
			resize: function(event, ui) {
				var max = Math.max,
					min = Math.min;

				if (ui.size.width) {
					ui.size.width = max(ui.size.width, ui.originalSize.width - ui.originalSize._bkp.width);
					ui.position.left = min(ui.position.left, ui.originalPosition.left + ui.originalSize._bkp.width);
				}
				if (ui.size.height) {
					ui.size.height = max(ui.size.height, ui.originalSize.height - ui.originalSize._bkp.height);
					ui.position.top = min(ui.position.top, ui.originalPosition.top + ui.originalSize._bkp.height);
				}
			}*/
		}
	}

	$scope.slides = {
		selectedSlides: [],
		deselectAllSlides: function() {
			$.each($scope.data.slides, function(k, slide) {
				slide.selected = false;
			});

			$scope.slides.selectedSlides = [];
		},

		selectSlide: function(slide_id) {
			$scope.data.slides[slide_id].selected = true;
			$scope.slides.selectedSlides.push(slide_id);
		},

		getSelectedSlides: function() {
			var selected = [];
			$.each($scope.data.slides, function(k, slide) {
				if (!slide.selected) return;
				selected.push(i);
			});

			return selected;
		}
	};

	getComponents(function(data) {
		$scope.data.components = data;
		$scope.$apply();
	});

	console.log('para acessar $scope use a variavel global $scope');
	window.$scope = $scope;

}]);