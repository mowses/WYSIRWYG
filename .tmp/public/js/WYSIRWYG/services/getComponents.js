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
					$.each(data.subcomponents || [], function(j, component_subcomponent) {
						var id = component_subcomponent.subcomponent;

						subcomponents[component_subcomponent.name] = component_subcomponent;

						// check for numeric, because id can be the prototyped object
						// hardest bug to track... this happens with with docs: component id 5 prototyping from 2 then 1
						// 5>2>1 because 2 proto from 1 that already changed its component_subcomponent.subcomponent
						// when 5 tries to refers to 2, component_subcomponent.subcomponent (id) is a object already
						if ($.isNumeric(id)) {
							component_subcomponent.subcomponent = prototyped_data[id];
						}
					});
					data.subcomponents = subcomponents;
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