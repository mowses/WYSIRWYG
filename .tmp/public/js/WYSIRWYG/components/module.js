(function() {

	var module = angular.module('WYSIRWYG.Components.Controllers', []);

	$.each(WYSIRWYG.Components.controllers, function(name, controller) {
		module.controller(name, ['$scope', controller]);
	});
})();