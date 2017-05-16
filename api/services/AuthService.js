const OAuth2Server = require('oauth2-server');

module.exports = new OAuth2Server({
    model: require('../models/OAuth.js')
});