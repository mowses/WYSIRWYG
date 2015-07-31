'use strict';

angular.module('WYSIRWYG.filters.jsonFormatter', [
	
])

.filter('jsonFormatter', function() {
    return function(json) {
        return JSON.stringify(json, null, '\t');
    }
});