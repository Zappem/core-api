process.env.NODE_ENV = 'test';
process.env.NODE_DB = 'nedb://memory';

var chai = require('chai'),
    chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.server = require('../api/index.js');

chai.helpers = {
    users: require('./helpers/users.js'),
    projects: require('./helpers/projects.js')
};

beforeEach(function(){
    return chai.server.relaunchDB();
});

module.exports = chai;