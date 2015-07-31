'use strict';

angular.module('WYSIRWYG.services.getThemes', [
	
])

/**
 * get component available themes
 * return theme names
 */
.factory('getThemes', function() {

	return function getThemes(component) {
		var themes = [];

		$.each(component.styles || [], function(k) {
			if (k.substr(0, 2) != '&.') return;

			var theme_name = k.substr(2);

			themes.push(theme_name);
		});

		return themes;
	}
})

/**
 * get component available languages
 * return languages names
 */
.factory('getLanguages', function() {

    return function getLanguages(component) {
        var languages = [];

        $.each(component.i18n || {}, function(k) {
            languages.push(k);
        });

        return languages;
    }
});