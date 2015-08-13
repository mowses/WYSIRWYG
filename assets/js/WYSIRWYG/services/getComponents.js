'use strict';

angular.module('WYSIRWYG.services.getComponents', [
	'WYSIRWYG.services.getThemes'
])

.factory('getComponents', ['prototypeComponents', 'getThemes', 'getLanguages', function(prototypeComponents, getThemes, getLanguages) {

	return function(ids, callback) {
		ids = $.makeArray(ids);

		$.get('/components', {
			components: ids
		}, function(data) {
			var components_subcomponents = {};

			data.components = prototypeComponents(data.components);

			// index components_subcomponents by row id
			$.each(data.components_subcomponents, function(i, sub) {
				components_subcomponents[sub.id] = sub;
				sub.component = data.components[sub.component];
				sub.subcomponent = data.components[sub.subcomponent];
			});
			data.components_subcomponents = components_subcomponents;

			$.each(data.components, function(id, component) {
				// fill subcomponents property
				component.subcomponents = {};

				// index subcomponents by name
				$.each(data.components_subcomponents, function(i, sub) {
					if (sub.component.id != id) return;
					component.subcomponents[sub.name] = sub;
				});

				if ($.isEmptyObject(component.subcomponents) && component.prototypeFrom) {
					component.subcomponents = data.components[component.prototypeFrom].subcomponents;
				}

				// get available themes and languages
				component.themes = getThemes(component);
				component.languages = getLanguages(component);
			});

			callback(data);
		});
	}
}])

.factory('prototypeComponents', function() {
	function prototypeComponents(components) {
		$.each(components, function(k, component) {
			var extends_from = component.prototypeFrom;

			if (!extends_from) return;

			component.__proto__ = components[extends_from];

			// remove null values from current component
			$.each(component, function(k, val) {
				if (val !== null) return;

				delete component[k];
			});
		});

		return components;
	}

	return function(data) {
		return prototypeComponents(data);
	}
});