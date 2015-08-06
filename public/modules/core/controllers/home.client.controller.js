'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'api',
	function($scope, Authentication, api) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.crawl = function() {
			api.search();
		}
	}
]);
