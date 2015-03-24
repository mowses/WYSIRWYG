angular.module('WYSIRWYG.i18n', [])

.directive('i18n', ['$compile', function($compile) {
	'use strict';

	return {
		restrict: 'E',
		transclude: true,
		scope: {
			id: '@',
			language: '@'
		},

		controller: ['$scope', function($scope) {
			$scope.getString = function() {
				var language = $scope.i18nLanguages[$scope.language];

				return (language && language[$scope.id]);
			}

			$scope.geti18nLanguages = function() {
				var local = ($scope.$parent.data.local || {}).i18n,
					base = ($scope.$parent.data.base || {}).i18n;

				return (local || base);
			}

			$scope.getLanguage = function() {
				return ($scope.language || $scope.$parent.language || Object.keys($scope.i18nLanguages)[0]);
			}

			$scope.i18nLanguages = $scope.geti18nLanguages();
			$scope.i18n = $scope.getString();
			
			// watch for base data changes
			$scope.$parent.$watch('data.base.i18n', function() {
				$scope.i18nLanguages = $scope.geti18nLanguages();
			});
			$scope.$parent.$watch('data.base.i18n["' + $scope.language + '"]["' + $scope.id + '"]', function() {
				$scope.i18n = $scope.getString();
			});

			// watch for local data changes
			$scope.$parent.$watch('data.local.i18n', function() {
				$scope.i18nLanguages = $scope.geti18nLanguages();
				$scope.i18n = $scope.getString();
			}, true);

			// watch for local language change
			if ($scope.language === undefined) {
				$scope.$watch('i18nLanguages', function() {
					$scope.language = $scope.getLanguage();
				});
			}

			$scope.$watch('language', function() {
				$scope.language = $scope.getLanguage();
				$scope.i18n = $scope.getString();
			});

		}],

		link: function($scope, $element) {
			$scope.$watch('i18n', function(new_i18n, old) {

				var compiled = $compile('<div>' + new_i18n + '</div>')($scope.$parent);
				
				$element
					.empty()
					.append(compiled.contents());
			});
		}
	};
}]);