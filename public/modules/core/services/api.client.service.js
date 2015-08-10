'use strict';

//Menu service used for managing  menus
angular.module('core').service('Api', ['$http', function($http) {
	var self = this;
	self.search = function(keyword) {
		$http.get('http://localhost:3000/search').then(function (result) {
			return result;
		});
	}

	self.share = function(payload) {
		$http.post('http://localhost:3000/share', {
			data: payload
		}).then(function (result) {
			return result;
		});
	}
}]);
