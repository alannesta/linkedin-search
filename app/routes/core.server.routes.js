'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.index);		// render the main page

	app.route('/search').get(core.crawl);
	app.route('/share').post(core.facebookShare);
};
