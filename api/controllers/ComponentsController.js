/**
 * EditorController
 *
 * @description :: Server-side logic for managing editor
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res, next) {
		var $ = sails.config.globals.jQuery;

		Components.find()
			.exec(function(err, data) {
				if (err || !data) return res.badRequest(err);

				return res.json(data);
			});
	},

	get: function(req, res, next) {
		var $ = sails.config.globals.jQuery,
			components = req.param('components');

		Components.find({
				name: components
			})
			.exec(function(err, data) {
				if (err || !data) return res.badRequest(err);

				return res.json(data);
			});
	}
};