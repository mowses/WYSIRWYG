angular.module('WYSIRWYG.ElementScopeWatcher', [])
/**
 * watch for directive scope changes
 * on changes, it should run callback passing the current $scope and $element as params
 * 
 * usage example: <div watcher="{'scopeProperty': 'controllerCallback'}"></div>
 */
.directive('watcher', ['$compile', '$parse', function($compile, $parse) {
	'use strict';

	return {
		restrict: 'A',
		transclude: false,
		
		controller: ['$scope', '$element', '$attrs', function($scope, $element, attrs) {
			var watchers = [];
            
            attrs.$observe('watcher', function(watcher) {
                var new_watchers = $parse(attrs.watcher)();
                
                // unwatch and reset previous watchers
                angular.forEach(watchers, function(watcher, i) {
                    watcher();
                });
                watchers = [];
                
                // bind new watchers
                angular.forEach(new_watchers, function(callbacks, k) {
                	callbacks = $.makeArray(callbacks);
                	
                    angular.forEach(callbacks, function(callback, i) {
                    	var callback = $scope.$eval(callback);
	                    watchers.push($scope.$watch(k, function() {
	                    	return callback($scope, $element);
	                    }));
                    });
                });
            });
		}],

		compile: function($element, attrs) {
			
			return {
				pre: function(scope, $element, attrs) {
					
				},
				post: function(scope, $element, attrs) {
					
				}
			}
		}
	};
}]);