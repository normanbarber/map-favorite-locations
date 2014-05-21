"use strict";
var _ = require('lodash-node'),
    path = require('path'),
    fs = require('fs');

exports.ServicesProvider = function ServicesProvider(providers, dirs) {
    if (this instanceof ServicesProvider === false) {
        return new ServicesProvider(providers, dirs);
    }

    var self = this;
    self['events'] = {};
    self.requests = [];
    var serviceType;

    dirs = _.isArray(dirs) ? dirs : [dirs];

    _.each(providers, function(provider) {
        var p = null, dir = null;
        try {
            dir = _.find(dirs, function(d) {
                return fs.existsSync(path.join(d, provider));
            }) || dirs[0];
            p = require(path.join(dir, provider));
        }
        catch(err) {
            console.log('Provider ' + provider + ' does not exist in ' + dir);
            console.log(err);
            throw(new Error('Provider Not Found'));
        }

        if (p.hasOwnProperty('type')) {
            serviceType = p.type;
        } else {
            throw (new Error('Provider Type Not Found'));
        }

        if (!self[serviceType]) {
            self[serviceType] = p;
        } else {
            if (self[serviceType].services) {
                _.extend(self[serviceType].services, p.services);
            }
            else {
                self[serviceType].services = p.services;
            }
            if (self[serviceType].requests) {
                _.extend(self[serviceType].requests, p.requests);
            }
            else {
                self[serviceType].requests = p.requests;
            }
        }
    });
};