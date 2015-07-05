angular.module('WYSIRWYG.Component', ['WYSIRWYG.i18n', 'WYSIRWYG.data'])

.directive('component', ['$compile', '$interpolate', 'getParentLanguage', function($compile, $interpolate, getParentLanguage) {
	'use strict';

	/**
	 * get available language based on attrs.language and scope.data.i18n
	 * do not update/change attrs.language, otherwise it may trigger getAvailableLanguage twice
	 */
	function getAvailableLanguage(scope, attrs) {
		var language = attrs.language || getParentLanguage(scope.$parent);
		language = scope.data.i18n[language] ? language : Object.keys(scope.data.i18n)[0];

		return language;
	}

	return {
		restrict: 'E',
		transclude: false,
		// controller config
		controller : ['$scope', '$attrs', '$controller', function($scope, attrs, $controller) {
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

		compile: function($element, attrs) {
			return {
				pre: function(scope, $element, attrs) {
					
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

					/*scope.$watch('data.styles', function(new_styles) {
						scope.$emit('updatedStyle', $element);
					});*/
				}
			};
		}
	};
}]);