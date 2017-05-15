process.env.NODE_ENV = 'test';
process.env.DB = 'nedb://memory';

var chai = require('chai'),
    chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.server = require('../api/index.js');

module.exports = chai;