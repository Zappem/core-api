var Document = require('camo').Document;
var User = require('./UserModel.js');

class OAuthTokens extends Document {
    constructor() {
        super();
        this.accessToken = { type: String };
        this.accessTokenExpiresOn = { type: Date };
        this.client = { type: Object };  // `client` and `user` are required in multiple places, for example `getAccessToken()`
        this.clientId = { type: String };
        this.refreshToken = { type: String };
        this.refreshTokenExpiresOn = { type: Date };
        this.user = { type: Object };
        this.userId = { type: String };
    }
}

class OAuthClients extends Document {
    constructor() {
        super();
        this.clientId = {type: String};
        this.clientSecret = {type: String};
        this.redirectUris = {type: Array};
        this.grants = [String];
    }
}

module.exports.clients = OAuthClients;

module.exports.updateTokens = function(user_id, data){
    var actions = [];
    return OAuthTokens.find({userId: user_id}).then(function(users){
         users.forEach(function(user){
             user = data;
             actions.push(user.save());
         });
         return Promise.all(actions);
    });
};

module.exports.getAccessToken = function(bearerToken){
    return OAuthTokens.findOne({accessToken: bearerToken});
};

module.exports.getClient = function(clientId, clientSecret) {
    return OAuthClients.findOne({ clientId: clientId, clientSecret: clientSecret });
};

module.exports.getRefreshToken = function(refreshToken) {
    return OAuthTokens.findOne({ refreshToken: refreshToken });
};

module.exports.getUser = function(email, password) {
    return User.findOne({ email: email, password: password });
};

module.exports.saveAuthorizationCode = function(code) {
    console.log(code);
};

module.exports.saveToken = function(token, client, user) {

    var newToken = new OAuthTokens;
    newToken.accessToken = token.accessToken;
    newToken.accessTokenExpiresOn = token.accessTokenExpiresOn;
    newToken.client = client;
    newToken.clientId = client.clientId;
    newToken.refreshToken = token.refreshToken;
    newToken.refreshTokenExpiresOn = token.refreshTokenExpiresOn;
    newToken.user = user;
    newToken.userId = user._id;

    return newToken.save();
};