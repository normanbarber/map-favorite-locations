var usercollection = require('../../lib/userCollection')(),
	Q = require('q'),
	userDataClient = require('../userDataClient'),
	bcrypt = require('bcrypt-nodejs');

module.exports = {
	type: "Express",
	services: {
		'handleLoginRequest': function(req, res) {
			"use strict";
			var username = req.body.username;
			var password = req.body.password;
			usercollection.getByUserName(username)
				.then(function(user){
					var data={};
					if(!user.data){
						data.status = 'error';
						data.error = 'there was a problem logging in';
						return Q.reject(data);
					}else{
						if (bcrypt.compareSync(password, user.data.password)) {
							data.username  = username;
							data.locationdata  = user.data.locationdata;
							data.status = 'success';

							userDataClient.updateUserData(req, res, data);
							res.send(data);
						}
						else {
							data.status = 'error';
							data.error = 'there was a problem logging in';
							return Q.reject(data);
						}
					}

				})
				.fail(function(data){
					res.send(data);
				});
		}
	}
};