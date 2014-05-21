var Q = require('q'),
	_ = require('lodash-node'),
    mongo = require('mongodb'),
    config = require('config');
var log;

function ensureID(obj) {
	if (obj && obj._id) {
		obj._id = (typeof obj._id === 'string' ? mongo.ObjectID(obj._id) : obj._id);
	}
}

var failFunction = function(i) {
	return function(err) {
		console.log(err);
		return Q.reject({
			errorNum : i,
			errorMsg : err.toString()
		});
	};
};

var urlFromConfig = function(collConfig, srvConfig) {
    var url = 'mongodb://';
    url += collConfig.db.servers.chat.host + ':' + collConfig.db.servers.chat.port + '/' + collConfig.db.collections.users.database;
    return url;
};

var connectInfoFromConfig = function(collectionName, defaultConfig) {
	var cfg = config.db  && config.db.collections && config.db.collections[collectionName] ? config : defaultConfig;
    var collCfg = cfg.db.collections[collectionName];
    var dbCfg = collCfg ? cfg.db.databases.chat.server : null;
    var srvCfg = dbCfg ? cfg.db.servers[dbCfg.server] : null;
    
    return {
    	url: urlFromConfig(cfg, srvCfg),
        options: srvCfg ? srvCfg.options : null
    };
}


module.exports = function(collectionName, uniqueField, RecordConstructor) {
    var Collection = {},
        db = null;

    var ensureConnection = function(fun) {
        return _.wrap(fun, function(fun) {
            var args = _.rest(arguments),
                self = this;

            var connInfo = connectInfoFromConfig(collectionName);
            return Q.ninvoke(mongo, 'connect', connInfo.url, connInfo.options || {})
                .then(function(db) {
                    args.unshift(db);
                    return fun.apply(self, args)
                        .fin(function() {
                            db.close();
                        });
                }, function(err) {
                    console.log('Failed to connect to db: ' + err.message);
                    return Q.reject(err);
                });
        });
    };

    if (!RecordConstructor) {
        RecordConstructor = function(record) {
            this.data = record;
        };
    }

    Collection.getURL = function(defaultDbConfig) {
        var connInfo = connectInfoFromConfig(collectionName, defaultDbConfig);
        return connInfo.url;
    };

    Collection.get = ensureConnection(function(db, queryObj) {
        console.log(collectionName + ' query "' + JSON.stringify(queryObj) + '"');
        var records = db.collection(collectionName);
        return Q.ninvoke(records, 'findOne', queryObj)
            .then(function(record) {
                if (!record) {
                    console.log(collectionName + ' for query "' + JSON.stringify(queryObj) + '" not found.');
                }
                return new RecordConstructor(record);
            })
            .fail(failFunction(0));
    });

    Collection.getById = function(id) {
        return Collection.get({
            _id : mongo.ObjectID(id)
        });
    };

    Collection.find = ensureConnection(function(db, queryObj, options) {
        var records = db.collection(collectionName),
            queryObj = queryObj || {},
            queryString = JSON.stringify(queryObj),
            options = options || {};

        console.log('Search records query: ' + queryString);

        return Q.ninvoke(records, 'find', queryObj, options)
            .then(function(cursor) {
                if (!cursor) {
                    console.log('no cursor');
                    return Q.reject(new Error('Record for query "' + queryString + '" not found.'));
                }
                console.log('  cursor to Array');
                return Q.ninvoke(cursor, 'toArray');
            })
            .then(function(data) {
                if (!data) {
                    console.log('no data');
                    return Q.reject(new Error('Record for query "' + queryString + '" not found.'));
                }
                return data;
            })
            .fail(failFunction(1));
    });

    Collection.save = ensureConnection(function(db, data) {
        console.log('Save record');
        var records = db.collection(collectionName);
        ensureID(data);
        data = _.omit(data, '$$hashKey');

        if (!uniqueField) {
            return Q.ninvoke(records, 'save', data, {safe : true})
                .then(function(result) {
                    if (result._id) {
                        return result._id;
                    };
                    return true;
                }).fail(failFunction(2));
        }

        return Q.ninvoke(records, 'findOne', {_id : data._id})
            .then(function(existing) {
                var query = {};
                if (data._id) {
                    query._id = {
                        $ne : data._id
                    };
                }
                query[uniqueField] = data[uniqueField];

                return Q.ninvoke(records, 'findOne', query)
                    .then(function(alias) {
                        if (alias) {
                            return Q.reject(new Error('Record with key [' + data[uniqueField] + '] already exists.'));
                        }
                        console.log('saving on server');
                        return Q.ninvoke(records, 'save', data, {safe : true})
                            .then(function(result) {
                                if (result._id) {
                                    return result._id;
                                }
                                return true;
                            });
                    });
            }).fail(failFunction(2));
    });

    Collection.update = ensureConnection(function(db, query, operator, options) {
        console.log('Update records');
        var records = db.collection(collectionName);
        return Q.ninvoke(records, 'update', query, operator, options)
            .fail(failFunction(2));
    });

    Collection.remove = ensureConnection(function(db, data) {
        console.log('Delete record');

        ensureID(data);

        var records = db.collection(collectionName);

        return Q.ninvoke(records, 'findOne', {_id : data._id})
            .then(function(existing) {
                if (!existing) {
                    return Q.reject(new Error('Record [' + data._id + '] not found.'));
                }

                return Q.ninvoke(records, 'remove', {_id : data._id})
                    .then(function() {
                        return true;
                    });

            }).fail(failFunction(3));
    });

    return Collection;
}