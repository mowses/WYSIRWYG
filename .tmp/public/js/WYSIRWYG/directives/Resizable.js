angular.module('WYSIRWYG.Resizable', [])

.directive('resizable', ['$parse', function($parse) {

	return {
		restrict: 'A',
		transclude: false,
		priority: -1000,

		compile: function($element, attrs) {

			return {
				pre: function(scope, $element, attrs) {

				},

				post: function(scope, $element, attrs) {
					
					// prevent jQuery stylize element, so we can change its style via css
					$element.on('resizecreate', function() {
						$element.find('> .ui-resizable-handle').removeAttr('style');
					});

					attrs.$observe('resizable', function(resizable) {
						var parsed = $parse(resizable);

						scope.$watch(function() {
							return parsed(scope);
						}, function(config) {
							$element.resizable(config);
						}, true);
					});
				}
			};
		}
	};
}]);