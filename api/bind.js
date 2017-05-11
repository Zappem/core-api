var bodyParser  = require('body-parser'),
    port        = process.env.PORT || 3002,
    router      = require('./routes.js'),
    servicer    = require('./services.js');

module.exports = function(app){

    var services = function(){
        app.services = servicer.init(app);
    };

    var routes = function(){
        router(app);
    };

    var listen = function(port){
        app.listen(port);
    };

    var middleware = function(){
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.url);
    };

    return function(){
        services();
        routes();
        listen(port);
        middleware();
        return app;
    };

};