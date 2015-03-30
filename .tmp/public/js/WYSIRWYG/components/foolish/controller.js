angular.module('WYSIRWYG.Components.Controllers', [])

.controller('foolish', ['$scope', function($scope) {
	console.log('fooolishh', $scope);
	$scope.alerta = function() {
		console.log('foolishhhhhhhhhhh alerta runs');
	}
}]);