'use strict';

angular.module('WYSIRWYG.services.generateCSS', [
	
])

.factory('generateCSS', function() {
    return function(id, jss) {
        var css = JSS.toCSS(ObserverCore.utils.object(['#' + id], jss)),
            head = $('head'),
            style = (css ? $('<style id="style-' + id + '">' + css + '</style>') : $(null));

        head
            .find('#style-' + id)
            .remove()
            .end()
            .append(style);
    }
});