angular.module('WYSIRWYG.EditableArea', [])

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
				console.log(event);
				// prevent mousedown propagation
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