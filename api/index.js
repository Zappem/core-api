var express     = require('express'),
    bodyParser  = require('body-parser'),
    connect     = require('camo').connect,
    dburi       = process.env.NODE_DB || 'nedb://'+__dirname+'/storage',
    routes      = require('./routes.js'),
    //services    = require('./services.js'),
    app         = express(),
    port        = process.env.PORT || 3005;


var bind = {
    // services: function(app){
    //     app.services = services.init(app);
    // },
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

app.launch = function() {
    /* Connect to the db */
    return new Promise(function(res, rej){
        connect(dburi).then(function (db) {
            app.db = db;
            bind.middleware(app);
            bind.routes(app);
            bind.listen(app, port);
            res();
        }).catch(function (e) {
            console.log(e);
            rej();
        });
    });
};

app.launch();

app.relaunchDB = function(callback){
    connect(dburi).then(function(db){
        app.db = db;
    })
};

module.exports = app;