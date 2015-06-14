'use strict';

angular.module('Css', [])

.filter('css', function() {
    return function(obj) {
        var res = [];

        $.each(obj || {}, function(k, value) {
        	res.push(k + ': ' + value);
        });

        return res.join('; ').trim();
    }
});