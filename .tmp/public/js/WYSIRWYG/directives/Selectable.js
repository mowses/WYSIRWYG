angular.module('WYSIRWYG.Selectable', [])

.directive('selectable', ['$compile', function($compile) {

	return {
		restrict: 'A',
		transclude: false,
		priority: -1000,

		compile: function($element, attrs) {
			
			return {
				pre: function($scope, $element, attrs) {
					attrs.selDistance = attrs.selDistance || 0;
					attrs.selFilter = attrs.selFilter || '> *';
					attrs.selDisabled = attrs.selDisabled || false;
					attrs.selDelay = attrs.selDelay || 0;
					attrs.selAutoRefresh = attrs.selAutoRefresh || false;
				},

				post: function($scope, $element, attrs) {
					$element.selectable({
						distance: attrs.selDistance,
						delay: attrs.selDelay,
						filter: attrs.selFilter,
						disabled: attrs.selDisabled,
						autoRefresh: attrs.selAutoRefresh,
						start: function(event, ui) {

						},
						selected: function(event, ui) {
							var $element = $(ui.selected);
							console.log('element selected:', $element);
							//console.log('foooo', $element.scope());
							//$compile($element)($scope);
						},
						unselected: function(event, ui) {
							var $element = $(ui.unselected);
							console.log('element unselected:', $element);
							//$element.$set('bounding-box', false);
							//$compile($element)($scope);
						}
					});
				}
			};
		}
	};
}]);