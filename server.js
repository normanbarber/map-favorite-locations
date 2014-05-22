var express = require('express'),
    MongoStore = require('connect-mongo')(express),
    path = require('path'),
    routes = require('./config/routes'),
    config = require('./config/default'),
    ServicesProvider = require('./config/servicesProvider'),
    routesconfig = require('./config/routes_config');

var app = express();
var sessionColl = require('./lib/sessionCollection')();

var host = config.db.servers.chat.host + ':' + config.db.servers.chat.port;
var dbname = config.db.databases.chat.server;
var url = path.join(host, dbname).replace(/\\/,"/");
url = 'mongodb://' + url;

var self = this;
var providerpath = '../config/providers/';
var providers = new ServicesProvider.ServicesProvider(config.data.provider, providerpath);

var webprovider = providers.Express;

var sessionOpts = {
    secret: 'locations',
    key: 'locations',
    cookie: {
        maxAge: 60000 * 20,
        httpOnly: false,
        secure: false
    }
};
sessionOpts.store = new MongoStore({url: url});

app.configure(function(){
    app.set('port', process.env.PORT || 5555);
    app.set('views', __dirname + '/public/views');
    app.set('view engine', 'jade');
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session(sessionOpts));
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
});

routes.setup({
    app: app,
    routes: routesconfig(),
    provider: webprovider
});
var server = app.listen(app.get('port'), function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
