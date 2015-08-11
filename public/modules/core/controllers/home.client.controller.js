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
			Api.share('Open graph stories');
		};

		$scope.FBlogin = function() {
			FB.getLoginStatus(function(response) {
				if (response.status === 'connected') {
					console.log('already logged in ');
				} else {
					FB.login(function(response) {
						console.log(response);
						if (response.status === 'connected') {
							console.log('Authenticated, accessToken: ' + response.authResponse.accessToken);
						} else if (response.status === 'not_authorized') {
							// The person is logged into Facebook, but not your app.
						} else {
							// The person is not logged into Facebook, so we're not sure if
							// they are logged into this app or not.
						}
					}, {scope: 'public_profile,email'});
				}
			});
		};

		$scope.FBlogout = function() {
			FB.logout(function(response) {
				console.log('Logged out: ', response);
			});
		};

		$scope.FBtestToken = function() {
			FB.api('/me', function(response) {
				console.log(JSON.stringify(response));
			});
		}

	}
]);
