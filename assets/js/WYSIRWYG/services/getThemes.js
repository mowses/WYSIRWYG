'use strict';

angular.module('WYSIRWYG.services.getThemes', [
	'WYSIRWYG.services.getThemes'
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
});