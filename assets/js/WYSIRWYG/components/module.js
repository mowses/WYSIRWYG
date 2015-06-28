(function() {

	var module = angular.module('WYSIRWYG.Components.Controllers', []);

	$.each(WYSIRWYG.Components.controllers, function(name, controller) {
		module.controller(name + 'Controller', ['$scope', controller]);
	});

	// just a null controller
	module.controller('nullController', ['$scope', function($scope) {
		console.warn('no controller defined for scope', $scope);
	}]);
})();