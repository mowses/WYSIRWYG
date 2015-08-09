'use strict';

angular.module('WYSIRWYG.modules.documentation', [
    'WYSIRWYG.services.debug',
    'WYSIRWYG.services.getComponents',
    'WYSIRWYG.services.generateCSS',
    'WYSIRWYG.directives.component',
    'WYSIRWYG.directives.i18n',
    'WYSIRWYG.filters.jsonFormatter'
])

.controller('DocumentationController', ['$scope', 'getComponents', 'getScopes', 'generateCSS', function($scope, getComponents, getScopes, generateCSS) {
	$scope.data = {
		base_components: {},
		components: {}
	};

	/**
	 * execute the component.code string as javascript
	 */
	$scope.evalCode = function(code) {
		eval(code);
	}

	getComponents([1,2,3,4,5], function(data) {
		$scope.data.base_components = data;

		// generate CSS
		$.each(data, function(i, component) {
			generateCSS('component-' + component.id, component.styles);
		});

		$.extend(true, $scope.data.components, data, {
			"1": {
				description: "Just a simple component with data, i18n and themes."
			},
			"2": {
				description: "This is a component with a subcomponent"
			},
			"3": {
				description: "This example shows a component with a subcomponent that contains another subcomponent inside it..."
			},
			"4": {
				description: "Example showing how to override a component and its subcomponents data. Remember: $scope.base_components are all shared instances," +
					"so, you should use $.extend(true, ...) on your components to make it have its own data instances.",
				code: '$scope.data.components[4].data.times = [1,2,3,4, \'...\', \'infinite\'];\n' +
					'$scope.data.components[4].subcomponents[\'mysub1\'].subcomponent.data.total = Math.random() * 9999;\n' + 
					'$scope.data.components[4].subcomponents[\'mysub1\'].subcomponent.subcomponents[\'mysub1\'].subcomponent.data.apples += 2;\n' +
					'$scope.data.components[4].subcomponents[\'mysub1\'].subcomponent.subcomponents[\'mysub1\'].subcomponent.data.applesEatten += 1;'
			},

			"5": {
				description: "Example showing how to override i18n. All strings were prefixed with text \"OVERRIDE\"."
			}
		});
	
		$scope.data.components['CUSTOM-SHARED'] = $.extend({
			description: "This is a custom shared component. You can see that also CUSTOM-SHARED-2 change its data when you click in the run button below. This is because both CUSTOM-SHARED shares its data. Note that both are extending from base_component[4]",
			code: '$scope.data.components[\'CUSTOM-SHARED\'].data.times = [\'un\',\'dos\',\'tres\',\'catorze\'];\n' +
					'$scope.data.components[\'CUSTOM-SHARED\'].subcomponents[\'mysub1\'].subcomponent.data.total = \'...A STRING THIS TIME...\';\n' + 
					'$scope.data.components[\'CUSTOM-SHARED\'].subcomponents[\'mysub1\'].subcomponent.subcomponents[\'mysub1\'].subcomponent.data.apples -= 2;\n' +
					'$scope.data.base_components[4].subcomponents[\'mysub1\'].subcomponent.subcomponents[\'mysub1\'].subcomponent.data.applesEatten -= 1;'
		}, $scope.data.base_components[4]);

		$scope.data.components['CUSTOM-SHARED-2'] = $.extend({
			description: "This is a custom shared component. You can see that also CUSTOM-SHARED-2 change its data when you click in the run button below. This is because both CUSTOM-SHARED shares its data. Note that both are extending from base_component[4]"
		}, $scope.data.base_components[4]);

		$scope.$digest();
	});

	console.log('para acessar $scope use a variavel global $scope, getScopes');
	window.$scope = $scope;
	window.getScopes = getScopes;

}]);