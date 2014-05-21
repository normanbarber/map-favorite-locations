'use strict';
describe('Controllers', function () {
	var expect = chai.expect,
		assert = chai.assert,
		should = chai.should();

	var mockData = {};

	beforeEach(module('favorloca.controllers'));
	beforeEach(module('favorloca.services'));
	beforeEach(module('ngRoute'));
	beforeEach(module('ngCookies'));
	beforeEach(inject(function(mockDataService) {
		mockData = mockDataService;
	}));

	describe("Signup Controller", function () {
		var scope, rootScope, apiService, httpService;
		var signupController;
		var signUpSpy;
		beforeEach(inject(function($rootScope, $controller, httpService){
				apiService = httpService;
				rootScope = $rootScope;
				scope = rootScope.$new();
				signupController = $controller("Signup", {
					$scope: scope,
					httpService: httpService
				});
		}));

		it('should call Signup controller and it should be defined and should exist', function() {
			signupController.should.exist;
		});

		it('should have $scope.frienderror equal to null', function() {
			expect(scope.frienderror).to.equal(null);
		});

		it('should return an appropriate error message - invalid username', function() {
			var parameters = { signup: {username:'m', password:'m', verify:'m'}};
			signUpSpy = apiService.callFunction("post", "signuperror_invalidusername", parameters);
			expect(signUpSpy.result.message).to.equal('invalid username. try letters and numbers. minimum allowed is 3');
		});

		it('should return an appropriate error message - password must match', function() {
			var parameters = { signup: {username:'moe', password:'moe', verify:'curly'}};
			signUpSpy = apiService.callFunction("post", "signuperror_password", parameters);
			expect(signUpSpy.result.message).to.equal('password must match');
		});

		it('should return an appropriate error message - no username/password', function() {
			var parameters = { signup: {username:'', password:'', verify:''}};
			signUpSpy = apiService.callFunction("post", "signuperror_nousername", parameters);
			expect(signUpSpy.result.message).to.equal('you must enter a username and password');
		});
	});

});