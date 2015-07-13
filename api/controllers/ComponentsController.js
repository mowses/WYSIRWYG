/**
 * EditorController
 *
 * @description :: Server-side logic for managing editor
 * @TO-DO		:: melhorar os selects
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res, next) {
		var $ = sails.config.globals.jQuery;

		Components.query('WITH recursive _subcomponents(id) AS ( SELECT * , array[id] AS found_components ' + 
			'FROM components WHERE id IN(WITH RECURSIVE _subcomponents(id) AS ( SELECT subcomponents.*, ' + 
				'array[subcomponents.components_component] AS found_components ' +
				'FROM components_subcomponents__components_component AS subcomponents ' +
				'UNION ALL SELECT subcomponents.*, ' +
				'found_components || subcomponents.components_component ' +
				'FROM components_subcomponents__components_component AS subcomponents INNER JOIN ' +
				'_subcomponents ON _subcomponents.components_component = subcomponents.components_subcomponents ' +
				'WHERE NOT subcomponents.components_component = ANY(found_components)) SELECT ' +
				'DISTINCT(components_component) FROM _subcomponents) UNION ALL SELECT components.*, ' +
				'found_components || components.id FROM components INNER JOIN _subcomponents ON ' +
				'_subcomponents."prototypeFrom" = components.id WHERE NOT components.id = ANY(found_components)) ' +
				'SELECT DISTINCT ON(id) * FROM ( SELECT * FROM _subcomponents UNION ALL SELECT *, NULL FROM ' +
					'components) AS components_w_subcomponents', function(err, data) {

			if (err || !data) return res.badRequest(err);
			data.rows.splice(1,1);
			return res.json(data.rows);
		});
	},

	get: function(req, res, next) {
		var $ = sails.config.globals.jQuery,
			components = req.param('components');

		Components.query('WITH recursive _subcomponents(id) AS ( SELECT * , array[id] AS found_components ' + 
			'FROM components WHERE id IN(WITH RECURSIVE _subcomponents(id) AS ( SELECT subcomponents.*, ' + 
				'array[subcomponents.components_component] AS found_components ' +
				'FROM components_subcomponents__components_component AS subcomponents ' +
				'WHERE components_subcomponents IN (' + components + ') UNION ALL SELECT subcomponents.*, ' +
				'found_components || subcomponents.components_component ' +
				'FROM components_subcomponents__components_component AS subcomponents INNER JOIN ' +
				'_subcomponents ON _subcomponents.components_component = subcomponents.components_subcomponents ' +
				'WHERE NOT subcomponents.components_component = ANY(found_components)) SELECT ' +
				'DISTINCT(components_component) FROM _subcomponents) UNION ALL SELECT components.*, ' +
				'found_components || components.id FROM components INNER JOIN _subcomponents ON ' +
				'_subcomponents."prototypeFrom" = components.id WHERE NOT components.id = ANY(found_components)) ' +
				'SELECT DISTINCT ON(id) * FROM ( SELECT * FROM _subcomponents UNION ALL SELECT *, NULL FROM ' +
					'components WHERE id IN (' + components + ')) AS components_w_subcomponents', function(err, data) {

			if (err || !data) return res.badRequest(err);
			return res.json(data.rows);
		});
	},

	create: function(req, res, next) {
		Components.create(
			req.param('component')
		).exec(function(err, component) {

			if (err) return res.badRequest(err);

			res.ok(component);
		});
	},

	update: function(req, res, next) {
		var component = req.param('component');

		Components.update({
			id: component.id
		}, component).exec(function(err, component) {
			if (err) return res.badRequest(err);

			res.ok(component);
		});
	},

	delete: function(req, res, next) {
		var $ = sails.config.globals.jQuery,
			ids = [];

		$.each(req.param('ids'), function(i, id) {
			ids.push({
				id: id
			});
		});

		if (!ids.length) return res.badRequest();

		Components.destroy(ids).exec(function(err, component) {
			if (err) return res.badRequest(err);

			res.ok();
		});
	}
};