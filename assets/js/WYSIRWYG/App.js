'use strict';

angular.module('WYSIRWYG', [
    'WYSIRWYG.services.getComponents',
    'WYSIRWYG.modules.Editor',
    'WYSIRWYG.modules.Editor.Raw'
])

/**
 * get attributes in @attrs that its property name prefixes @prefix
 */
/*.factory('getAttributes', function() {
	function getAttributes(prefix, attrs) {

		var filtered_attrs = {},
			prefix_len = prefix.length;
		
		$.each(attrs, function(name, attr) {
			var index = name.indexOf(prefix);
			if (index !== 0) return;

			var prop_name = name.substr(prefix_len,1).toString().toLowerCase() + name.substr(prefix_len + 1);

			// parse attr to correct data type
			if (attr === 'true') {
				attr = true;
			} else if (attr === 'false') {
				attr = false;
			} else if ($.isNumeric(attr)) {
				attr = parseFloat(attr);
			}

			filtered_attrs[prop_name] = attr;
		});

		return filtered_attrs;
	}

	return function(prefix, attrs) {
		return getAttributes(prefix, attrs);
	}
})*/

.controller('AppController', ['$scope', 'getComponents', 'getScopes', 'mergeReferences', function($scope, getComponents, getScopes, mergeReferences) {

    $scope.Component = WYSIRWYG.Component;
    $scope.data = {
        components: null
    };

    $scope.Component.watch(null, function(data) {
        $scope.data.components = $.extend(true, $scope.data.components || {}, data.diff);
        mergeReferences($scope.data.components);
        $scope.$apply();
    });

    getComponents();

    console.log('para acessar $scope use a variavel global $scope, getScopes');
    window.$scope = $scope;
    window.getScopes = getScopes;

}]);