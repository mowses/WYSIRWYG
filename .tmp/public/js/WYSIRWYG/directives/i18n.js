angular.module('WYSIRWYG.directives.i18n', [
	'WYSIRWYG.services.getParentLanguage'
])

.directive('i18n', ['$compile', 'getParentLanguage', function($compile, getParentLanguage) {
	'use strict';

	/**
	 * get available language based on attrs.language and scope.i18n
	 * do not update/change attrs.language, otherwise it may trigger getAvailableLanguage twice
	 */
	function getAvailableLanguage(scope, attrs) {
		var language = attrs.language || getParentLanguage(scope);
		language = scope.data.i18n[language] ? language : Object.keys(scope.data.i18n)[0];

		return language;
	}

	return {
		restrict: 'E',
		transclude: false,
		scope: {
			id: '@',
			language: '@'
		},

		controller: ['$scope', '$attrs', function($scope, attrs) {
			
		}],

		compile: function($element, attrs) {
			return {
				pre: function(scope, $element, attrs) {

				},
				post: function(scope, $element, attrs) {
					scope.$watch(function() {
						scope.language = getAvailableLanguage(scope.$parent.$parent, attrs);
						return scope.$parent.$parent.data.i18n[scope.language][scope.id];
					}, function(string) {
						// respect that order: first insert html inside element then compile
						$element.empty().html(string);
						$compile($element.contents())(scope);
					});
				}
			}
		}
	};
}]);