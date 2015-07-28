'use strict';

angular.module('WYSIRWYG.services.getThemes', [
	'WYSIRWYG.services.getThemes'
])

.factory('getParentLanguage', function() {
    function getParentLanguage(scope) {
        if (scope.language) return scope.language;
        if (!scope.$parent) return;

        return getParentLanguage(scope.$parent);
    }

    return function(scope) {
        return getParentLanguage(scope);
    }
});