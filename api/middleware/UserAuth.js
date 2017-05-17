var AuthService = require('../services/AuthService.js');

module.exports = {

    authenticate: function(req, res, next){
        AuthService.oauth.authenticate()(req, res, function(){
            console.log(res.locals.oauth.token.userId);
            AuthService.setUser(res.locals.oauth.token.userId);
            next();
        });
    },

    token: function(req, res, next){
        AuthService.oauth.token()(req, res, function(){

        });
    }

};