var usercollection = require('../../lib/userCollection')(),
	Q = require('q'),
	userDataClient = require('../userDataClient'),
	bcrypt = require('bcrypt-nodejs');

module.exports = {
	type: "Express",
	services: {
		'handleSignupRequest': function(req, res){

			var username = req.body.username;
			var password = req.body.password;
			var verify = req.body.verify;
			var errors = {'username': username};
			userDataClient.deleteUserData(res);

			validate.signup(username, password, verify,  errors)
				.then(function(){
					return usercollection.addUser(username, password);
				})
				.then(function(){
					var data = {};
					data.username = username;
					userDataClient.updateUserData(req, res, data);
					res.send(data);
				})
				.fail(function(err){
					var data={};
					if (err.errorNum == 2)
						data.error = err.errorMsg;
					else
						data.error = err;

					data.status = 'error';
					res.send(data);
				});
		}
	}
};

var validate = {
	signup: function (username, password, verify, errors) {
		var userreg = /^[a-zA-Z0-9_-]{3,20}$/;
		var passwordreg = /^.{3,20}$/;

		errors['username_error'] = "";
		errors['password_error'] = "";
		errors['verify_error'] = "";

		if(username === undefined || password === undefined)
			return Q.reject('you must enter a username and password');

		if (!userreg.test(username)) {
			errors['username_error'] = "invalid username. try letters and numbers. minimum allowed is 3";
			return Q.reject(errors['username_error']);
		}
		if (!passwordreg.test(password)) {
			errors['password_error'] = "invalid password.";
			return Q.reject(errors['password_error']);
		}
		if (password != verify) {
			errors['verify_error'] = "password must match";
			return Q.reject(errors['verify_error']);
		}
		return Q(username);
	}
};
