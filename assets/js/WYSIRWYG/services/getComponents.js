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
			var prototyped_data = prototypeComponents($.makeArray(data));

			// fill subcomponents property
			$.each(prototyped_data, function(i, data) {
				var subcomponents = {};

				if ($.isEmptyObject(data.subcomponents) && data.prototypeFrom) {
					data.subcomponents = prototyped_data[data.prototypeFrom].subcomponents;
				} else {
					$.each(data.subcomponents, function(k, component_subcomponent) {
						//component_subcomponent.component = prototyped_data[component_subcomponent.component];
						component_subcomponent.subcomponent = prototyped_data[component_subcomponent.subcomponent];
					});
				}

				data.themes = getThemes(data);
				data.languages = getLanguages(data);
			});

			callback(prototyped_data);
		});
	}
}])

.factory('prototypeComponents', function() {
	function prototypeComponents(data) {
		var components = {};

		$.each(data || [], function(i, data) {
			components[data.id] = data;
		});

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