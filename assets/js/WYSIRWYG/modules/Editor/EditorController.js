'use strict';

angular.module('WYSIRWYG.modules.Editor', [
	'ui.bootstrap',
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
.controller('EditorController', ['$scope', 'getComponents', 'generateCSS', 'mergeReferences', 'getThemes', function($scope, getComponents, generateCSS, mergeReferences, getThemes) {

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
	$scope.updateDraggable = function(scope, $element) {
		var css = $element.css(['position']);

		$.extend(true, scope.slide.boundingBox.draggable, {
			disabled: ($.inArray(css['position'], ['absolute', 'fixed']) == -1)
		});

		console.log('carry on from here. position esta errado, porque $element ainda nao existe no DOM (acho q é isso). foo draggable ipdated', scope.slide.boundingBox.draggable.disabled, $element, css, scope.slide.component.styles['&.theme-default'].position);
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
		}*/}
	};

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
					selected_theme = scope.slide.selectedTheme,
					current_theme = '&.' + selected_theme,
					extend_to = scope.slide.component.name + '.styles["' + current_theme + '"]',
					styles = $.extend(true, {}, ui.position);

				if (selected_theme) {
					WYSIRWYG.Component.extendData(extend_to, styles).apply(); // do apply otherwise the element will be flickering
				}
				element.attr('style', '');  // prevent having `style` attribute

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
					selected_theme = scope.slide.selectedTheme,
					current_theme = '&.' + selected_theme,
					extend_to = scope.slide.component.name + '.styles["' + current_theme + '"]',
					styles = $.extend(true, {}, ui.position, ui.size);
				
				if (selected_theme) {
					WYSIRWYG.Component.extendData(extend_to, styles).apply(); // do apply otherwise the element will be flickering
				}
				element.attr('style', '');  // prevent having `style` attribute

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

	WYSIRWYG.Component.watch(null, function(data) {
		$.each(data.deleted || [], function(k) {
			generateCSS(k, null);
			$scope.data.slides = delete_properties($scope.data.slides, data.deleted || {});
		});

		$.each(data.new, function(k, _new) {
			var new_data = $.extend(true, {}, _new),
				slide = $scope.data.slides[k],
				diff = data.diff ? data.diff[k] : undefined,
				deleted = data.deleted ? data.deleted[k] : undefined,
				themes,
				selected_theme;
			
			mergeReferences([new_data]);

			if (!slide) {  // slide doesnt exist

				themes = getThemes(new_data);
				selected_theme = themes[0];

				slide = $scope.data.slides[k] = {
					name: new_data.name,
					selected: false,
					component: new_data,
					themes: themes,
					selectedTheme: selected_theme
				};
			} else {
				selected_theme = slide.selectedTheme;

				if ((diff && diff.styles) || deleted && deleted.styles) {
					// changed styles
					themes = getThemes(new_data);

					// re-set selected theme once its no more exists
					if ($.inArray(selected_theme, themes) == -1) {
						selected_theme = themes[0];
					}
				}

				$.extend(slide, {
					name: new_data.name,
					component: new_data,
					themes: themes,
					selectedTheme: selected_theme
				});
			}

			if (diff || deleted) {
				generateCSS(k, new_data.styles);

				// every time a component's css changes, we should recalculate some of its properties
				if (!slide.boundingBox) {
					slide.boundingBox = {
						draggable: $.extend(true, {}, $scope.editableArea.draggable),
						resizable: $.extend(true, {}, $scope.editableArea.resizable)
					};
				}
			}

		});


		$scope.$apply();
	});

	getComponents();

	$scope.slides.selectedSlides = $scope.slides.getSelectedSlides();

	console.log('para acessar $scope use a variavel global $scope');
	window.$scope = $scope;

}]);