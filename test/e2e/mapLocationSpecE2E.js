var protractor = require('protractor'),
	ptor = protractor.getInstance(),
	timeout = 200000,
	helpers = require('./helpers')(ptor),
	mockModules = 'test/mocks/mockAngularModules.js',
	mockLoader = require('../mocks/mockLoader'),
	mockData = require('../mocks/mockData.js'),
	modulename = 'favorloca.services',
	baseUrl = 'http://localhost:5555';

describe('Map Favorite Locations', function() {

	beforeEach(function() {
		ptor.clearMockModules();
		ptor.ignoreSynchronization = true;
	}, timeout);

	afterEach(function() {
		ptor.clearMockModules();
		ptor.ignoreSynchronization = false;
	});

	describe('when user visits login page', function() {
		beforeEach(function() {
			ptor.get(baseUrl);
			helpers.waitForNavigation(baseUrl);
		}, timeout);

		it('should sendKeys to the input box', function(){
			ptor.findElement(protractor.By.tagName('input')).sendKeys('moe');
		}, timeout);

		it('should not let user named hambone to login', function(){
			ptor.findElement(protractor.By.className('username')).sendKeys('hambone');
			ptor.findElement(protractor.By.className('password')).sendKeys('hambone')
				.then(function(text){
					ptor.findElement(protractor.By.className('btn')).click()
						.then(function(){
							ptor.getCurrentUrl()
								.then(function(url){
									expect(url).toEqual(baseUrl + '/');
								});
						});
				});
		}, timeout);
	});

	describe('when user visits signup page', function() {
		beforeEach(function() {
			ptor.get(baseUrl);
			helpers.waitForNavigation(baseUrl);
		}, timeout);

		it('should have a search button', function(){
			ptor.findElement(protractor.By.className('signup')).click()
				.then(function(){
					ptor.getCurrentUrl()
						.then(function(url){
                            helpers.waitForNavigation(baseUrl + '/signup');
							expect(url).toEqual(baseUrl + '/signup');
						})
				})
		}, timeout);

		it('should let throw an error if user does not enter anything for password', function(){
            ptor.findElement(protractor.By.className('signup')).click()
				.then(function(){
					helpers.waitForNavigation(baseUrl + '/signup');
					ptor.findElement(protractor.By.className('username')).sendKeys('m')
						.then(function(){

							ptor.findElement(protractor.By.className('btn')).click()
								.then(function(){
									ptor.findElement(protractor.By.className('error')).getText()
										.then(function(text){
											expect(text).toEqual('you must enter a username and password');
										});
								});
						});
				});

		}, timeout);

		it('should not let user enter username/password with less than 3 characters', function(){
            ptor.findElement(protractor.By.className('signup')).click()
				.then(function(){
					helpers.waitForNavigation(baseUrl + '/signup');
					ptor.findElement(protractor.By.className('username')).sendKeys('m')
					ptor.findElement(protractor.By.className('password')).sendKeys('m')
					ptor.findElement(protractor.By.className('verify')).sendKeys('m')
						.then(function(){

							ptor.findElement(protractor.By.className('btn')).click()
								.then(function(){
									ptor.findElement(protractor.By.className('error')).getText()
										.then(function(text){
											expect(text).toEqual('invalid username. try letters and numbers. minimum allowed is 3');
										});
								});
						});
				});

		}, timeout);

		it('should not let user signup if the password and verify password do not match', function(){
            ptor.findElement(protractor.By.className('signup')).click()
				.then(function(){
					helpers.waitForNavigation(baseUrl + '/signup');
					ptor.findElement(protractor.By.className('username')).sendKeys('mnopqrstuvwxyz')
					ptor.findElement(protractor.By.className('password')).sendKeys('mmmm')
					ptor.findElement(protractor.By.className('verify')).sendKeys('qqq')
						.then(function(){

							ptor.findElement(protractor.By.className('btn')).click()
								.then(function(){
									ptor.findElement(protractor.By.className('error')).getText()
										.then(function(text){
											expect(text).toEqual('password must match');
										});
								});
						});
				});

		}, timeout);

		it('should let user signup if the password and verify password match', function(){
            ptor.findElement(protractor.By.className('signup')).click()
				.then(function(){
					helpers.waitForNavigation(baseUrl + '/signup');
					ptor.findElement(protractor.By.className('username')).sendKeys('hambone')
					ptor.findElement(protractor.By.className('password')).sendKeys('hambone')
					ptor.findElement(protractor.By.className('verify')).sendKeys('hambone')
						.then(function(){

							ptor.findElement(protractor.By.className('btn')).click()
								.then(function(){
									helpers.waitForNavigation(baseUrl + '/welcome');
									ptor.getCurrentUrl()
										.then(function(url){

											expect(url).toEqual(baseUrl + '/welcome');
										});
								});
						});
				});

		}, timeout);

	});

	describe('when user visits welcome page', function() {
		beforeEach(function() {
			ptor.get(baseUrl);
			helpers.waitForNavigation(baseUrl);
		}, timeout);

		it('should let user visit welcome after login', function(){
			ptor.findElement(protractor.By.className('username')).sendKeys('hambone');
			ptor.findElement(protractor.By.className('password')).sendKeys('hambone')
				.then(function(text){
					ptor.findElement(protractor.By.className('btn')).click()
						.then(function(){
							helpers.waitForNavigation(baseUrl + '/welcome');
							ptor.getCurrentUrl()
								.then(function(url){
									expect(url).toEqual(baseUrl + '/welcome');
								});
						});
				});
		}, timeout);

        it('should let user input an address', function(){
            ptor.findElement(protractor.By.className('username')).sendKeys('hambone');
            ptor.findElement(protractor.By.className('password')).sendKeys('hambone')
                .then(function(text){
                    ptor.findElement(protractor.By.className('btn')).click()
                        .then(function(){
                            helpers.waitForNavigation(baseUrl + '/welcome');
                            ptor.sleep(5000);
                            ptor.findElement(protractor.By.className('search')).sendKeys('hamboning, kentucky')
                        });

                });

        }, timeout);

        it('should let user input an address and click search', function(){
            ptor.findElement(protractor.By.className('username')).sendKeys('hambone');
            ptor.findElement(protractor.By.className('password')).sendKeys('hambone')
                .then(function(text){
                    ptor.findElement(protractor.By.className('btn')).click()
                        .then(function(){
                            helpers.waitForNavigation(baseUrl + '/welcome')
                            ptor.sleep(5000);

                            ptor.findElement(protractor.By.className('search')).sendKeys('san francisco, ca')
                                .then(function(){
                                    ptor.findElement(protractor.By.className('btn-search')).click()
                                });

                        });

                });

        }, timeout);


	});

});