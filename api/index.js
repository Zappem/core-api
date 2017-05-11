var express     = require('express'),
    bodyParser  = require('body-parser'),
    connect     = require('camo').connect,
    dburi       = 'nedb://'+__dirname+'/storage',
    routes      = require('./routes.js'),
    services    = require('./services.js'),
    app         = express(),
    port        = process.env.PORT || 3002;


var bind = {
    services: function(app){
        app.services = services.init(app);
    },
    routes: function(app){
        routes(app);
    },
    listen: function(app, port){
        app.listen(port);
    },
    middleware: function(app){
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
    }
};

/* Connect to the db */
connect(dburi).then(function(db) {
    app.db = db;

    bind.middleware(app);
    bind.services(app);
    bind.routes(app);
    bind.routes(app);
    bind.listen(app, port);
}).catch(function(e){
    console.log(e);
});

