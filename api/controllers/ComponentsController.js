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
			components = req.param('components'),
			sql;

		Components.query(sql = 'WITH recursive _components (id) AS ( ' +
		// search for subcomponents
		'WITH RECURSIVE _subcomponents(id) AS ( ' +
			// non recursive
			'SELECT sub.* ' +
			'FROM components_subcomponents AS sub ' +
			(components ? 'WHERE component IN (' + components + ') ' +
			// in cases where component dont have subcomponents, only prototypeFrom
			'OR component IN ( ' +
				'SELECT "prototypeFrom" FROM components WHERE id IN (' + components + ') ' +
			') ' : '') +
			
			'UNION ALL ' +

			// recursive
			'SELECT sub.* ' +
			'FROM components_subcomponents AS sub ' +
			'INNER JOIN _subcomponents ON _subcomponents.subcomponent = sub.component ' +
		') ' +

		// run:
		'SELECT *, array [id] AS _found_components ' +
		'FROM components ' +
		(components ? 'WHERE id IN (' + components + ') OR id IN ( ' +
			'SELECT subcomponent FROM _subcomponents ' +
		') ' : '') +
		
		'UNION ALL ' +
		
		'SELECT components.*, _found_components || components.id ' +
		'FROM components ' +
		'INNER JOIN _components ON _components."prototypeFrom" = components.id ' +
		'WHERE NOT components.id = ANY (_found_components) ' +
	') ' +

	'SELECT DISTINCT ON (id) * ' +
	'FROM _components AS _c', function(err, components) {

			if (err || !components) return res.badRequest(err);

			var indexed_components = {},
				// get components_subcomponents rows
				sub_ids = [];

			$.each(components.rows, function(i, row) {
				indexed_components[row.id] = row
				sub_ids.push(row.id);
			});

			Components_subcomponents
				.find({id: sub_ids})
				.exec(function(err, components_subcomponents) {
					
					if (err) return res.badRequest(err);

					return res.json({
						components: indexed_components,
						components_subcomponents: components_subcomponents
					});
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