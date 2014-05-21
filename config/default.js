module.exports = {
    data: {
        provider: [
            'loginProvider.js',
            'welcomeProvider.js',
            'signupProvider.js'
        ]
    },
	db: {
	  	servers: {
	    	chat: {
		    	host: 'ds033419.mongolab.com',
		        port: 33419,
                options: {
                    server: {
                        poolSize: 10
                    },
                    db: {
                        journal: true
                    }
                }
	        }
	    },
	    databases: {
	    	chat: {
	        	server: 'favoritelocations'
	        }
	    },
	    collections: {
	    	users: {
	        	database: 'favoritelocations'
		    },
		    sessions: {
	    	    database: 'favoritelocations'
	        }
	    }
	}
};