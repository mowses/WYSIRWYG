'use strict';

angular.module('trustAsHtml', [])

.filter('trustAsHtml', ['$sce', function($sce) {
	return function(html) {
		return $sce.trustAsHtml(html);
	};
}]);