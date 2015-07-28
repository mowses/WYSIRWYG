angular.module('WYSIRWYG.directives.component', [
	'WYSIRWYG.directives.i18n',
	'WYSIRWYG.directives.data'
])

.directive('component', ['$compile', '$interpolate', 'getParentLanguage', function($compile, $interpolate, getParentLanguage) {
	'use strict';

	/**
	 * get available language based on attrs.language and scope.data.i18n
	 * do not update/change attrs.language, otherwise it may trigger getAvailableLanguage twice
	 */
	function getAvailableLanguage(scope, attrs) {
		var language = attrs.language || getParentLanguage(scope.$parent),
			data = scope.data,
			i18n = data && data.i18n ? data.i18n : {};

		language = i18n[language] ? language : Object.keys(i18n)[0];

		return language;
	}

	return {
		restrict: 'E',
		transclude: false,
		// controller config
		controller: ['$scope', '$attrs', '$controller', function($scope, attrs, $controller) {
			var controller_name = attrs.controllerName || ($scope.data.name + 'Controller'),
				controller_name = $interpolate(controller_name)($scope);

			$scope.language = getAvailableLanguage($scope, attrs);
			attrs.$observe('language', function() {
				$scope.language = getAvailableLanguage($scope, attrs);
				$scope.$broadcast('parentChangedLanguage');
			});

			$scope.$on('parentChangedLanguage', function() {
				$scope.language = getAvailableLanguage($scope, attrs);
			});


			/*return $controller(controller_name, {
				$scope: {
					id: $scope.id,
					language: $scope.language,
					data: $scope.data
				}
			});*/
		}],
		controllerAs: 'controller',
		name: 'controllerName',
		// end controller definition
		scope: {
			id: '@',
			language: '@',
			data: '='
		},
		templateUrl: '/templates/Directives/Component.html',

		compile: function($element, attrs) {
			return {
				pre: function(scope, $element, attrs) {

				},

				post: function(scope, $element, attrs) {
					// hold child scope - used by the compiled sub-components
					// and destroyed on data change
					// preventing memory leaks
					scope.childScope = scope.$new();

					// parseTemplate could be called from a partial onload
					scope.parseTemplate = function() {
						var template_placeholder = $element.find('.template'),
							template = scope.data.template;

						// destroy previous child scope
						scope.childScope.$destroy();
						// create a new child scope for sub-components
						scope.childScope = scope.$new();

						// respect that order: first insert html inside element then compile
						// this way require would work for ^editableArea
						template_placeholder.empty().html(template);
						$compile(template_placeholder.contents())(scope.childScope);
					}

					scope.$watch('data.template', function() {
						scope.parseTemplate();
					});

					/*scope.$watch('data.styles', function(new_styles) {
						scope.$emit('updatedStyle', $element);
					});*/
				}
			};
		}
	};
}]);