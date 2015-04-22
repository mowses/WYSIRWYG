'use strict';

angular.module('Debug', [])

.factory('getScopes', function() {
	function getScopes(root) {
		var scopes = [],
			scope_ids = [];

		function visit(scope) {
			scopes.push(scope);
			scope_ids.push(scope.$id);
		}

		function traverse(scope) {
			if (scope_ids.indexOf(scope.$id) >= 0) return;

			visit(scope);
			if (scope.$$nextSibling)
				traverse(scope.$$nextSibling);
			if (scope.$$childHead)
				traverse(scope.$$childHead);
			if (scope.$$childTail)
				traverse(scope.$$childTail);
			if (scope.$$prevSibling)
				traverse(scope.$$prevSibling);
		}

		traverse(root);
		return scopes;
	}

	return function() {
		var scopes = getScopes($scope);
		console.log('you have', scopes.length, 'angularjs scopes in your site', scopes);
	};
});