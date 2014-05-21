var chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon'),
	sandbox = require('sandboxed-module'),
	Q = require('q');

chai.use(require('sinon-chai'));

describe('Map Location Providers', function() {
	process.setMaxListeners(0);	// avoid Q promise library warning

	var env = {};

	beforeEach(function() {

		env.req = {
			body: {
				username: 'buddy',
				address: 'San Francisco, CA',
				name: 'work'
			},
			cookies: {
				userData:''
			}
		};


        env.reqdel = {
            body: {
                username: 'buddy',
                locationclicked: {
                    address: 'San Francisco, CA'
                }
            },
            cookies: {
                userData:''
            }
        };

        env.res = {
			send: sinon.stub(),
            clearCookie: sinon.stub()
		};
		env.res.send.returns(Q(env.user));

		env.user = {
			data:{
				username: 'buddy',
				password: 'buddy'
			}
		};

		env.compsync = {
			data:{
				password: 'doo'
			}

		};
		env.bcrypt = {
			compareSync: sinon.stub()
		};
		env.bcrypt.compareSync.returns(Q(env.compsync));

		env.updatelocation = {
			username: 'buddy',
            address: 'San Francisco, CA',
            id: 1,
            lat: -34.397,
            lng: 150.644,
            name: 'work'
		};
        env.deletelocation = {};

		env.userCollection = {
			getByUserName: sinon.stub(),
            updateLocation: sinon.stub(),
            saveLocations: sinon.stub()
		};
		env.userCollection.getByUserName.returns(Q(env.user));
		env.userCollection.updateLocation.returns(Q(env.updatelocation));
        env.userCollection.saveLocations.returns(Q(env.deletelocation));

		env.loginProvider = sandbox.require('../../../config/providers/loginProvider', {
			requires: {
				'bcrypt-nodejs': env.bcrypt,
				'../../lib/userCollection': function() { return env.userCollection; }
			}
		});
		env.signupProvider = sandbox.require('../../../config/providers/signupProvider', {
			requires: {
				'bcrypt-nodejs': env.bcrypt,
				'../../lib/userCollection': function() { return env.userCollection; }
			}
		});
		env.welcomeProvider = sandbox.require('../../../config/providers/welcomeProvider', {
			requires: {
				'bcrypt-nodejs': env.bcrypt,
				'../../lib/userCollection': function() { return env.userCollection; }
			}
		});

	});

	describe('Testing loginProvider', function() {

		describe('Login request', function() {
			beforeEach(function() {
				env.handler = env.loginProvider.services.handleLoginRequest(env.req, env.res);
			});

			it('should expect userCollection.getByUserName to be called one time', function() {
				expect(env.userCollection.getByUserName).to.have.been.calledOnce;
			});
		});

		describe('Testing signupProvider', function() {
			beforeEach(function() {
				env.handler = env.signupProvider.services.handleSignupRequest(env.req, env.res);
			});

			it('should call clearCookie one time', function() {
				expect(env.res.clearCookie).to.have.been.calledOnce;
			});

		});
	});

	describe('Testing welcomeProvider updateLocation', function() {

		beforeEach(function() {
			env.handler = env.welcomeProvider.services.updateLocation(env.req, env.res);
		});

		describe('Add new favorite location', function() {
			it('should call userCollection getByUserName', function() {
				expect(env.userCollection.getByUserName).to.have.been.calledOnce;
			});
			it('should call userCollection addFriend', function() {
				expect(env.userCollection.updateLocation).to.have.been.calledOnce;
			});
		});

	});

    describe('Testing welcomeProvider deleteLocation', function() {

        beforeEach(function() {
            env.handler = env.welcomeProvider.services.deleteLocation(env.reqdel, env.res);
        });

        describe('Add new favorite location', function() {
            it('should call userCollection getByUserName', function() {
                expect(env.userCollection.getByUserName).to.have.been.calledTwice;
            });
            it('should call userCollection addFriend', function() {
                expect(env.userCollection.saveLocations).to.have.been.calledOnce;
            });
        });

    });
});

