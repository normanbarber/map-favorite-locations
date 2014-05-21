var _ = require('underscore'),
    userDataClient = require('./userDataClient'),
    routeHandlers = require('./routeHandlers'),
    path = require('path');

module.exports.setup = function(params) {

    var app = params.app,
        routes = params.routes,
        provider = params.provider,
        handlers = routeHandlers();

    routes.forEach(function(route) {
        app[route.method](
            route.route,
            handlers.make({route: route,provider: provider, root: params.root, paths: params.paths})
        );
    });
};
