'use strict';

var http = require('http');
var https = require('https');
var dev_config = require('../../config/env/development');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var facebookBase = 'graph.facebook.com';

exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req,
		facebookAppId: dev_config.facebook.clientID
	});
};

exports.search = function(req, res) {
	// TODO: db query

};

exports.crawl = function(req, res) {
	// TODO: crawl
	// Step 1 get the access_token from providerData in user record
	var accessToken;
	User.findOne({provider: 'linkedin'}, 'providerData', function(err, result) {
		if (err) console.log('err: ' + err);
		accessToken = result.providerData.accessToken;
		console.log('token: ' + accessToken);
	});

	// Step 2 set proper http header

	//var options = {
	//	hostname: 'api.linkedin.com',
	//	port: 80,
	//	path: '',
	//	method: 'GET',
	//	headers: {
	//		Authorization: accessToken
	//	}
	//};
	//
	//var request = http.request(options, function(response) {
	//	response.setEncoding('utf8');
	//	response.on('data', function (chunk) {
	//		console.log('BODY: ' + chunk);
	//	});
	//});
	//
	//request.on('error', function(e) {
	//	console.log('problem with request: ' + e.message);
	//});
};

exports.facebookShare = function(req, res) {
	//console.log(req);
	var accessToken, userId, message;
	User.findOne({provider: 'facebook'}, 'providerData', function(err, result) {
		if (err) console.log('err: ' + err);
		accessToken = result.providerData.accessToken;
		userId = result.providerData.id;
		message = 'OG Story';
		console.log('token: ' + userId);

		var options = {
			hostname: facebookBase,
			port: 443,
			path: '/' + userId + '/feed?message=' + encodeURIComponent(message) + '&access_token=' + accessToken,
			method: 'POST'
			//headers: {
			//	'Content-Type': 'application/x-www-form-urlencoded'		// not mandatory
			//}
		};

		var request = https.request(options, function(response) {
			response.setEncoding('utf8');
			response.on('data', function(chunk) {
				console.log('BODY: ' + chunk);
			});
			res.send('ok');
		});

		request.on('error', function(e) {
			console.log('problem with request: ' + e.message);
		});

		request.write('');
		request.end();

	});
};
