var express     = require('express'),
    bodyParser  = require('body-parser'),
    connect     = require('camo').connect,
    dburi       = process.env.NODE_DB || 'nedb://'+__dirname+'/storage',
    routes      = require('./routes.js'),
    //services    = require('./services.js'),
    app         = express(),
    port        = process.env.PORT || 3006,
    userAuth    = require('./middleware/UserAuth.js'),
    oauth = require('./services/AuthService.js');

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
            return oauth.init();
        }).catch(function (e) {
            console.log(e);
            rej();
        }).then(function(){
            app.oauth = oauth.start();
            bind.middleware(app);
            bind.listen(app, port);
            bind.routes(app);
            res();
        });
    });
};

app.launch();

app.relaunchDB = function(){
    connect(dburi).then(function(db){
        app.db = db;
    }).then(function(db){
        return oauth.init();
    });
};

module.exports = app;