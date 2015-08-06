'use strict';

var http = require('http');
var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

exports.search = function(req, res) {
	// TODO: db query

};

exports.crawl = function(req, res) {
	// TODO: crawl
	// Step 1 get the access_token from providerData in user record
	var accessToken;
	User.findOne({provider: 'linkedin'}, 'providerData', function(err, providerData) {
		accessToken = providerData.accessToken;
	});
	// Step 2 set proper http header

	var options = {
		hostname: 'api.linkedin.com',
		port: 80,
		path: url,
		method: 'GET',
		headers: {
			Authorization: accessToken
		}
	};

	var req = http.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log('BODY: ' + chunk);
		});
	});

	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});
};
