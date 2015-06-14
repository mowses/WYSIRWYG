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
	'WYSIRWYG.ElementScopeWatcher',
	'WYSIRWYG.Components.Controllers',
	'ngModelUtils',
	'Debug'
])

.factory('getComponents', function() {

	return function(callback) {
		var socket = io.socket;

		socket.on('connect', function() {
			socket.get('/components', function(data) {
				var components = WYSIRWYG.Component.getData();

				$.each(data, function(i, component) {
					components[component.name] = component;
				});

				callback ? callback(data) : null;
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
		var css = JSS.toCSS(ObserverCore.utils.object(['#' + id], jss)),
			head = $('head'),
			style = (css ? $('<style id="style-' + id + '">' + css + '</style>') : $(null));

console.log(id, css);
		head
			.find('#style-' + id)
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

}])

.controller('EditorController', ['$scope', 'getComponents', 'generateCSS', 'mergeReferences', function($scope, getComponents, generateCSS, mergeReferences) {

	// set directive watcher in the view, so every time updated theme should update bb
	$scope.updateResizable = function(scope, $element) {
		var css = $element.css(['display']);

		$.extend(true, scope.slide.boundingBox.resizable, {
			disabled: ($.inArray(css['display'], ['inline']) >= 0)
		});
	};

	// set directive watcher in the view, so every time updated theme should update bb
	$scope.updateDraggable = function(scope, $element) {
		var css = $element.css(['position']);

		$.extend(true, scope.slide.boundingBox.draggable, {
			disabled: ($.inArray(css['position'], ['absolute', 'fixed']) == -1)
		});
	};

	/**
	 * get component available themes
	 * return theme names
	 */
	function getThemes(component) {
		var themes = [];

		$.each(component.styles, function(k) {
			if (k.substr(0, 2) != '&.') return;

			var theme_name = k.substr(2);

			themes.push(theme_name);
		});

		return themes;
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
			grid: $scope.grid.grid
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
					scope = element.scope();

				element.prop('style', '');
				$.extend(true, scope.slide.component.styles['&.' + scope.slide.selectedTheme], ui.position, ui.size);
				console.log('continuar daqui', scope);

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