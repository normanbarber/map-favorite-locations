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
		    	host: 'localhost',
		        port: 27017,
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