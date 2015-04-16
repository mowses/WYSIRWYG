angular.module('WYSIRWYG.BoundingBox', [])

.directive('boundingBox', [function() {
	'use strict';

	var options = $.ui.resizable.prototype.options,
		scope = {};

	// get all jQuery's resizable options to pass as scope
	// prefix all the keys with 'bb'
	$.each(options, function(k, val) {
		scope[k] = '@bb' + k.substr(0,1).toUpperCase() + k.substr(1);
	});

	return {
		restrict: 'AE',
		transclude: false,
		scope: scope,

		compile: function($element, $attrs) {
			
			return {
				pre: function($scope, $element, $attrs) {
					
				},

				post: function($scope, $element) {
					var _options = {};
					$.each(options, function(name, option) {
						if ($scope[name] === undefined) return;
						_options[name] = $scope[name];
					});

					$element.resizable(_options);
				}
			};
		}
	};
}]);