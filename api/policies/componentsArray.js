module.exports = function(req, res, next) {
	var $ = sails.config.globals.jQuery,
		components = $.makeArray(req.param('components')),
		all_int = false;

	// validates if all passed components are integers
	$.each(components || [], function(i, id) {
		if ($.isNumeric(id)) return (all_int = true);

		all_int = false;
		return false;
	});

	if (all_int) return next();

	return res.badRequest('All components should be integer');
};