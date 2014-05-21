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

    describe("Login Controller", function () {
        var scope, rootScope, apiService, httpService;
		var loginController;
        var loginSpy;
        beforeEach(inject(function($rootScope, $controller, httpService){
            rootScope = $rootScope;
            scope = rootScope.$new();
            apiService = httpService;
            loginController = $controller("Login", {
                $scope: scope,
                httpService: httpService

            });
        }));
        it('should call Login controller and it should be defined', function() {
            loginController.should.exist;
        });
        it('should have $scope.isLoaded equal to false', function() {
			expect(scope.login.username).to.equal('');
        });
        it('should return successfully', function() {
            var parameters = { signup: {username:'moe', password:'moe'}};
            loginSpy = apiService.callFunction("post", "login", parameters);
            expect(loginSpy.result.status).to.equal('success');
        });
    });

});