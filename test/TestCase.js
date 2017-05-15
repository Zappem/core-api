process.env.NODE_ENV = 'test';
process.env.NODE_DB = 'nedb://memory';

var chai = require('chai'),
    chaiHttp = require('chai-http');

chai.use(chaiHttp);
//chai.server = require('../api/index.js');
chai.server = "http://localhost:3005";

module.exports = chai;