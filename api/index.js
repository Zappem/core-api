var express     = require('express'),
    bodyParser  = require('body-parser'),
    connect     = require('camo').connect,
    dburi       = process.env.NODE_DB || 'nedb://'+__dirname+'/storage',
    routes      = require('./routes.js'),
    //services    = require('./services.js'),
    app         = express(),
    port        = process.env.PORT || 3006,
    OAuthServer = require('express-oauth-server');

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
        //app.use(app.oauth.token());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        //app.use(app.oauth.token());

    }
};

app.launch = function() {
    /* Connect to the db */
    return new Promise(function(res, rej){
        connect(dburi).then(function (db) {
            app.db = db;

            var Auth = require('./models/OAuth.js');

            // var client = new Auth.clients();
            //
            // client.clientId = "test";
            // client.clientSecret = "hey!";
            // client.grants = ["password"];
            // client.save();

            app.oauth = new OAuthServer({
                model: require('./models/OAuth.js'),
                grants: [
                    'password'
                ]
            });

            bind.middleware(app);
            bind.listen(app, port);
            bind.routes(app);
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