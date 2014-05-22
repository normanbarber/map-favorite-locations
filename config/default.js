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
            favorloca: {
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
            favorloca: {
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