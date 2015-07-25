angular.module('WYSIRWYG.EditableArea', ['WYSIRWYG.Component'])

.config(['$provide', function($provide) {
		// decorator for <component> directive
		$provide.decorator('componentDirective', ['$delegate', '$compile', function($delegate, $compile) {
			var directive = $delegate[0],
				compile = directive.compile,
				controller_index = directive.controller.length - 1,
				requires = $.makeArray(directive.require),
				controller_fn = directive.controller[controller_index];

			directive.require = $.merge(['^editableArea'], requires);

			directive.controller[controller_index] = function($scope) {
				var controller_result = controller_fn.apply(this, arguments);

				$scope.draggable = {
					appendTo: 'body',
					cursor: 'move',
					delay: 80,
					disabled: true,
					//grid: $scope.grid.grid,
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

						element.attr('style', ''); // prevent having `style` attribute
						generateCSS('component-' + component.id, component.styles);
					}
				};

				$scope.resizable = {
					alsoResize: false,
					disabled: true,
					handles: 'all',
					//grid: $scope.grid.grid,
					// should not have `style` attribute setted on bounding-box
					stop: function(event, ui) {
							// nao sei qual usar: ui.element ou ui.originalElement ????
							/*var element = ui.originalElement,
								scope = element.scope(),
								component = scope.slide.component,
								selected_theme = scope.slide.selectedTheme,
								current_theme = '&.' + selected_theme,
								styles = $.extend(true, {}, ui.position, ui.size);

							if (selected_theme) {
								$.extend(true, component.styles[current_theme], styles);
							}

							element.attr('style', ''); // prevent having `style` attribute
							generateCSS('component-' + component.id, component.styles);*/

						}
						/*,
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
				};

				$scope.toggleCtrlBB = function(event) {
					var bb = $(event.delegateTarget),
						editable_area = bb.parents('[editable-area]:first');

					if (!editable_area.length) return;

					return editable_area.scope().toggleCtrlBB.apply(this, arguments);
				};

				return controller_result;
			};

			directive.templateUrl = '/templates/EditableArea.html';

			directive.compile = function($element, attrs) {
				var link = compile.apply(this, arguments),
					post_original = link.post;

				delete attrs.id;
				delete attrs.ngClass;

				/*link.post = function(scope, $element, attrs) {

					var bb_scope = scope.$new(),
						post = post_original.apply(this, arguments),
						compiled = $compile('<bounding-box ' +
							'ng-attr-id="' + ($element.attr('ng-attr-id') || '') + '" ' +
							'ng-class="' + ($element.attr('ng-class') || '') + '" ' +
							'id="' + ($element.attr('id') || '') + '" ' +
							'class="' + ($element.attr('class') || '') + '" ' +
							'draggable="draggable" ' +
							'resizable="resizable" ' +
							'ng-mousedown="toggleCtrlBB($event);" ' +
							//'watcher="{'slide.component.styles[\'&.{{slide.selectedTheme}}\'].display': 'updateResizable', 'slide.component.styles[\'&.{{slide.selectedTheme}}\'].position': 'updateDraggable', 'slide.selectedTheme': 'checkDisableResizable'}"
							'></bounding-box')(bb_scope);

					

					$element
						.removeAttr('id')
						.removeAttr('class')
						.removeAttr('ng-attr-id')
						.removeAttr('ng-class')
						.before(compiled);

					compiled.append($element);

					//console.log($element, scope.id, attrs.id, attrs.class, scope, compiled);
					return post;
				};*/

				return link;
			};

			return $delegate;
		}]);

	}])

.directive('editableArea', ['$compile', function($compile) {

	return {
		restrict: 'A',
		transclude: false,

		controller: ['$scope', function($scope) {
			$scope.$selected = []; // hold selected bounding-box elements

			/**
			 * select/deselect bb methods
			 */
			$scope.deselectAllBB = function() {
				$scope.selected = [];
			}

			$scope.deselectCtrlBB = function(event) {
				if (event.ctrlKey) return;
				$scope.deselectAllBB();
			}

			$scope.toggleCtrlBB = function(event) {
				// prevent event propagation
				event.stopPropagation();

				var target = $(event.target);

				if (target.is('.ui-resizable-handle')) return;

				var el = event.currentTarget,
					index = $.inArray(el, $scope.selected);

				if (!event.ctrlKey) {
					$scope.selected = [el];
				} else if (index == -1) {
					$scope.selected.push(el);
				} else {
					$scope.selected.splice(index, 1);
				}
			}

			// watch for DOM elements selection change
			$scope.$watchCollection('selected', function(new_selected, old_selected) { // http://teropa.info/blog/2014/01/26/the-three-watch-depths-of-angularjs.html
				// deselect old
				$(old_selected).removeClass('ui-selected');
				// select new
				$(new_selected).addClass('ui-selected');
			});

		}],

		compile: function($element, attrs) {
			return {
				pre: function(scope, $element, attrs) {

				},

				post: function(scope, $element) {

				}
			};
		}
	};
}]);