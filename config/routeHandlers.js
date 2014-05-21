var path = require('path'),
	userDataClient = require('./userDataClient');

function render(options) {
	options = options || {};
	return function(req, res) {
		var data = {};
		var userData = userDataClient.getUserData(req);
		res.render(path.normalize(options.template), data);
	}
}    

function handler(options) {
	options = options || {};
	var provider = options.provider || {};
	var services = provider.services || {};
	var hnd = options.handler || {};
	if (services[hnd.method]) {

		return function(req,res,next) {
			return services[hnd.method](req,res,next);
		}
	}
	return function () {
		console.log('Warning: Route handler [' + hnd.method + '] not found!');
	};
}

function make(options) {
	options = options || {};
	if (options.route.render) {
        return render({template: options.route.render.template});
	}
	if (options.route.handler) {
        return handler({handler: options.route.handler, provider: options.provider});
	}
	return function() {
		console.log('Warning: No action defined for route [' + options.route.route + ']!');
	}
}

module.exports = function() {
	return {
		make: make,
		render: render,
		handler: handler
	};
};