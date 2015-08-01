'use strict';

angular.module('WYSIRWYG.services.generateCSS', [
	
])

.factory('generateCSS', function() {
    return function(id, jss) {
        var obj = {};
        obj['#' + id] = jss;

        var css = JSS.toCSS(obj),
            head = $('head'),
            style = (css ? $('<style id="style-' + id + '">' + css + '</style>') : $(null));

        head
            .find('#style-' + id)
            .remove()
            .end()
            .append(style);
    }
});