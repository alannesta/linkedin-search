'use strict';

//Menu service used for managing  menus
angular.module('core').service('Api', ['$http', function($http) {
	var self = this;
	self.search = function(keyword) {
		$http.get(url).then(function (result) {
			return result;
		});
	}
}]);
