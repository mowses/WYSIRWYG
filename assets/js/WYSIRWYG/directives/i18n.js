angular.module('WYSIRWYG.directives.i18n', [

])

.directive('i18n', ['$compile', 'getParentLanguage', function($compile, getParentLanguage) {
	'use strict';

	/**
	 * get available language based on attrs.language and scope.i18n
	 * do not update/change attrs.language, otherwise it may trigger getAvailableLanguage twice
	 */
	function getAvailableLanguage(scope, attrs) {
		var language = attrs.language || getParentLanguage(scope.$parent);
		language = scope.data[language] ? language : Object.keys(scope.data)[0];

		return language;
	}

	return {
		restrict: 'E',
		transclude: false,
		scope: {
			id: '@',
			language: '@',
			data: '='
		},

		controller: ['$scope', '$attrs', function($scope, attrs) {

			$scope.$on('parentChangedLanguage', function() {
				$scope.language = getAvailableLanguage($scope, attrs);
			});

			/*attrs.$observe('language', function() {
				$scope.language = getAvailableLanguage($scope, attrs);
			});*/

			$scope.language = getAvailableLanguage($scope, attrs);
		}],

		compile: function($element, attrs) {
			attrs.data = attrs.data || 'data.i18n';

			return {
				pre: function(scope, $element, attrs) {

				},
				post: function(scope, $element, attrs) {
					// hold child scope - used by the compiled sub-components
					// and destroyed on data change
					// preventing memory leaks
					scope.childScope = scope.$parent.$new();

					scope.$watch(function() {
						return scope.data[scope.language][scope.id];
					}, function(string) {
						// destroy previous child scope
						scope.childScope.$destroy();
						// create a new child scope for sub-components
						scope.childScope = scope.$parent.$new();
						//console.log('i18n changed:', attrs.id, scope, scope.$parent, scope.childScope);
						var compiled = $compile('<div>' + string + '</div>')(scope.childScope);
						$element.empty().append(compiled.contents());
					});
				}
			}
		}
	};
}]);