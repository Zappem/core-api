var Auth = require('./models/OAuth.js');

var client = new Auth.clients();

client.clientId = "test";
client.clientSecret = "hey!";
client.save();