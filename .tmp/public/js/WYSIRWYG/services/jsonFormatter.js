'use strict';

angular.module('WYSIRWYG.filters.jsonFormatter', [
	
])

.filter('join', function() {
    return function(arr, joiner) {
        if (!arr) return;

        return arr.join(joiner);
    }
});