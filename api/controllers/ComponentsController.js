/**
 * EditorController
 *
 * @description :: Server-side logic for managing editor
 * @TO-DO		:: melhorar os selects
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res, next) {
		var $ = sails.config.globals.jQuery,
			components = req.param('components');

		Components.query('WITH recursive _subcomponents(id) AS ( SELECT * , array[id] AS found_components ' + 
			'FROM components WHERE id IN(WITH RECURSIVE _subcomponents(id) AS ( SELECT subcomponents.*, ' + 
				'array[subcomponents.component] AS found_components ' +
				'FROM components_subcomponents AS subcomponents ' +
				(components ? 'WHERE subcomponent IN (' + components + ') ' : '') +
				'UNION ALL SELECT subcomponents.*, ' +
				'found_components || subcomponents.component ' +
				'FROM components_subcomponents AS subcomponents INNER JOIN ' +
				'_subcomponents ON _subcomponents.component = subcomponents.subcomponent ' +
				'WHERE NOT subcomponents.component = ANY(found_components)) SELECT ' +
				'DISTINCT(component) FROM _subcomponents) UNION ALL SELECT components.*, ' +
				'found_components || components.id FROM components INNER JOIN _subcomponents ON ' +
				'_subcomponents."prototypeFrom" = components.id WHERE NOT components.id = ANY(found_components)) ' +
				'SELECT DISTINCT ON(id) *, ' +
					'(SELECT array_agg(id) FROM components_subcomponents ' +
					'subcomponents WHERE component = components_w_subcomponents.id) AS ids_rows_subcomponents ' +
				'FROM ( SELECT * FROM _subcomponents UNION ALL SELECT *, NULL FROM components ' +
					(components ? 'WHERE id IN (' + components + ')' : '' ) +
					') AS components_w_subcomponents', function(err, data) {

			if (err || !data) return res.badRequest(err);

			// store subcomponents
			var subcomponents_rows_ids = [];
			$.each(data.rows, function(i, row) {
				row.ids_rows_subcomponents = row.ids_rows_subcomponents || [];
				$.merge(subcomponents_rows_ids, row.ids_rows_subcomponents);
			});

			// search for components_subcomponents
			Components_subcomponents.find({
				id: subcomponents_rows_ids
			}).exec(function(err, subcomponents) {
				if (err) return res.badRequest(err);

				// populate component.subcomponents property
				$.each(data.rows, function(i, row) {
					var subcomponents_prop = {};

					$.each(subcomponents, function(i, sub) {
						if (row.ids_rows_subcomponents.indexOf(sub.id) < 0) return;

						subcomponents_prop[sub.name] = sub;
					});

					row.subcomponents = subcomponents_prop;
				});

				return res.json(data.rows);
			});
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
			ids = req.param('components');

		if (!ids.length) return res.badRequest();

		Components.destroy(ids).exec(function(err, component) {
			if (err) return res.badRequest(err);

			res.ok();
		});
	}
};