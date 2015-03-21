/**
 * ComponentsController
 *
 * @description :: Server-side logic for managing components
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res, next) {
		Components.find()
			.exec(function(err, data) {
				if (err || !data) return res.badRequest(err);
				return res.json(data);
			});
	},

	create: function(req, res, next) {
		var data = req.param('data');

		Components.create(data)
			.exec(function(err, data) {
				if (err || !data) return res.badRequest(err);
				return res.ok();
			});
	},
};