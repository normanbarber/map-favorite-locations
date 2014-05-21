(function () {
	'use strict';
    favorloca.module('favorloca.services', [])
		.factory('mockDataService', [function () {
			var service = {
				login: {"status": "success", "username": "moe"},
				signup: {"status": "success", "username": "moe"},
				signuperror_invalidusername: {"status": "error", "message": "invalid username. try letters and numbers. minimum allowed is 3"},
				signuperror_password: {"status": "error", "message": "password must match"},
				signuperror_nousername: {"status": "error", "message": "you must enter a username and password"},
				addfriend: JSON.stringify({"code": "03-add"})
			};
			return service;
		}]);
})();

