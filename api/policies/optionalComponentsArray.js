module.exports = function(req, res, next) {
	if (req.param('components') === undefined) return next();

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

	return res.badRequest('components isn\'t required, but if you inform it, it must be integer');
};