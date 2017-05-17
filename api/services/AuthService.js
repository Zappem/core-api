const OAuthServer = require('express-oauth-server'),
      OAuthModel = require('../models/OAuth.js'),
      User = require('../models/UserModel.js'),
      grants = [
          'password'
      ];

var init = function(){
    var obj = this;
    obj.checkZappemClientExists().then(function(exists){
        if(exists == null) return obj._createZappemClient();
    });
};

var start = function(){
    return new OAuthServer({
        model: OAuthModel,
        grants: grants
    });
};

var checkZappemClientExists = function(){
    return OAuthModel.getClient('zappem-base', "j5)x>UU~MVRP@pdN");
};

var _createZappemClient = function(){
    var client = new OAuthModel.clients;
    client.clientId = "zappem-base";
    client.clientSecret = "j5)x>UU~MVRP@pdN";
    client.grants = ["password"];
    return client.save().then();
};

var getUser = function(res, callback){
    return User.findOne({
        _id: res.locals.oauth.token.userId
    }).then(callback);
};

var canViewProjects = function(req, res, next){
    next();
};

var canViewThisProject = function(req, res, next){
    canViewProjects(req, res, function(){
        getUser(res).then(function(user){

            next();
        });
    });
};

var canWriteProjects = function(req, res, next){
    next();
};

console.log('loaded');

module.exports.init = init;
module.exports.start = start;
module.exports.checkZappemClientExists = checkZappemClientExists;

module.exports.canViewProjects = canViewProjects;
module.exports.canViewThisProject = canViewThisProject;
module.exports.canWriteProjects = canWriteProjects;