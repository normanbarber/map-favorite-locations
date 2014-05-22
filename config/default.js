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
				host: 'moe:moe@ds033629.mongolab.com',
				port: 33629,
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