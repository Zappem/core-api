process.env.NODE_ENV = 'test';
process.env.NODE_DB = 'nedb://memory';

var chai = require('chai'),
    chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.server = require('../api/index.js');

beforeEach(function(){
    return chai.server.relaunchDB();
});

module.exports = chai;