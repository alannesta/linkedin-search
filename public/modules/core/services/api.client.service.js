'use strict';

//Menu service used for managing  menus
angular.module('core').service('Api', ['$http', function($http) {
	var self = this;
	self.search = function(keyword) {
		$http.get('http://localhost:3000/search').then(function (result) {
			return result;
		});
	}
}]);
