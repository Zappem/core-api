const OAuthServer = require('express-oauth-server'),
      OAuthModel = require('../models/OAuth.js'),
      grants = [
          'password'
      ];

module.exports.init = function(){
    return new OAuthServer({
        model: OAuthModel,
        grants: grants
    });
}

module.exports.checkZappemClient = function(){

    // Does the Zappem client exist?
    OAuthModel.getClient('zappem-base', "j5)x>UU~MVRP@pdN").then(function(exists){
        if(exists == null){
            var client = new OAuthModel.clients;
            client.clientId = "zappem-base";
            client.clientSecret = "j5)x>UU~MVRP@pdN";
            client.grants = ["password"];
            return client.save().then();
        }
    });

};