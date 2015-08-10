'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Api',
	function($scope, Authentication, Api) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.crawl = function() {
			console.log('crawl');
			Api.search();
		};

		$scope.share = function() {
			console.log('share');
			Api.share();
		}
	}
]);
