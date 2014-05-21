var collection = require('./dbCollection');
var bcrypt = require('bcrypt-nodejs');

module.exports = function() {
    var UserCollection = collection('users', 'username', null);
    UserCollection.getByUserName = function(username) {
        return UserCollection.get({username: username.toLowerCase()});
    };
    UserCollection.addUser = function(username, password) {
        "use strict";
        var salt = bcrypt.genSaltSync();
        var password_hash = bcrypt.hashSync(password, salt);
        return UserCollection.save({'username': username, 'password': password_hash});
    };
    UserCollection.updateLocation = function(username, data) {

        return UserCollection.update({'username': username}, {$push: {locationdata: data}});
    };
    UserCollection.saveLocations = function(username, data) {
        return UserCollection.update({'username': username}, {$set: {locationdata: data}});
    };
    return UserCollection;
};