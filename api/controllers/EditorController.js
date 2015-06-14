/**
 * EditorController
 *
 * @description :: Server-side logic for managing editor
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res, next) {
		var $ = sails.config.globals.jQuery;

		return res.view({
			
		});
	}
};