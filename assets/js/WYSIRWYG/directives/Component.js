angular.module('WYSIRWYG.Component', ['WYSIRWYG.i18n', 'WYSIRWYG.data'])

.directive('component', ['$compile', 'getParentLanguage', function($compile, getParentLanguage) {
	'use strict';

	return {
		restrict: 'E',
		transclude: false,
		// define controller config
		controller : '@',
		name: 'controllerName',
		// end controller definition
		scope: {
			id: '@',
			language: '@',
			data: '='
		},

		compile: function($element, attrs) {
			attrs.data = attrs.data || 'data.components["' + attrs.id + '"]';
			attrs.controllerName = attrs.controllerName || (attrs.id + 'Controller as controller');

			return {
				pre: function(scope, $element, attrs) {
					attrs.language = attrs.language || getParentLanguage(scope.$parent);
					attrs.language = scope.data.i18n[attrs.language] ? attrs.language : Object.keys(scope.data.i18n)[0];
				},

				post: function(scope, $element, attrs) {
					// hold child scope - used by the compiled sub-components
					// and destroyed on data change
					// preventing memory leaks
					scope.childScope = scope.$new();

					scope.$watch('data.template', function(new_template) {
						// destroy previous child scope
						scope.childScope.$destroy();
						// create a new child scope for sub-components
						scope.childScope = scope.$new();

						var compiled = $compile('<div>' + new_template + '</div>')(scope.childScope);
						$element.empty().append(compiled.contents());
					});
				}
			};
		}
	};
}]);