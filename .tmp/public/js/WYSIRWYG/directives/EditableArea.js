angular.module('WYSIRWYG.EditableArea', [])

.directive('editableArea', ['$compile', function($compile) {

	function selectedElement($element) {
		$element.resizable({
			disabled: false
		});
	}

	function deselectedElement($element) {
		$element.resizable('option', 'disabled', true);
	}

	return {
		restrict: 'A',
		transclude: false,
		scope: {

		},

		controller: ['$scope', function($scope) {
			$scope.selected = [];

			// watch for DOM elements selection change
			$scope.$watchCollection('selected', function(new_selected, old_selected) {  // http://teropa.info/blog/2014/01/26/the-three-watch-depths-of-angularjs.html
				console.log('selected elements changed', new_selected);
			});
		}],
		
		compile: function($element, $attrs) {
			var selected_unselected = false;
			return {
				pre: function($scope, $element, $attrs) {
					
				},

				post: function($scope, $element) {
					$element
					.selectable({
						distance: 0,
						delay: 0,
						filter: '> *',
						disabled: false,
						autoRefresh: true,
						tolerance: 'touch',
						start: function(event, ui) {
							selected_unselected = false;
						},
						selected: function(event, ui) {
							var selected = ui.selected,
								$element = $(selected),
								element_index = $.inArray(selected, $scope.selected);
							console.log('foooo selected triggered');
							if (element_index == -1) {
								$scope.selected.push(selected);
								selectedElement($element);
								selected_unselected = true;
							}

						},
						unselected: function(event, ui) {
							var unselected = ui.unselected,
								$element = $(unselected),
								element_index = $.inArray(unselected, $scope.selected);
							
							if (element_index >= 0) {
								$scope.selected.splice(element_index, 1);
								deselectedElement($element);
								selected_unselected = true;
							}
							
						},
						stop: function(event, ui) {
							if (selected_unselected) {
								$scope.$apply();
							}
						}
					});
				}
			};
		}
	};
}]);