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
		'SELECT *, array [id] AS found_components ' +
		'FROM components ' +
		(components ? 'WHERE id IN (' + components + ') OR id IN ( ' +
			'SELECT subcomponent FROM _subcomponents ' +
		') ' : '') +
		
		'UNION ALL ' +
		
		'SELECT components.*, found_components || components.id ' +
		'FROM components ' +
		'INNER JOIN _components ON _components."prototypeFrom" = components.id ' +
		'WHERE NOT components.id = ANY (found_components) ' +
	') ' +

	'SELECT DISTINCT ON (id) *, ( ' +
		// fill subcomponents
		'SELECT array_to_json(array_agg(row_to_json(d))) FROM ( ' +
			'SELECT * FROM components_subcomponents AS sub WHERE sub.component IN (_c.id) ' +
		') AS d ' +
	') AS subcomponents ' +
	'FROM _components AS _c', function(err, data) {

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
			ids = req.param('components');

		if (!ids.length) return res.badRequest();

		Components.destroy(ids).exec(function(err, component) {
			if (err) return res.badRequest(err);

			res.ok();
		});
	}
};