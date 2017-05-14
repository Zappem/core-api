//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
process.env.DB = 'nedb://memory';

//let mongoose = require("mongoose");
//let Book = require('../app/models/book');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../api/index');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
// describe('Books', function(){
//     beforeEach((done) => { //Before each test we empty the database
//     Book.remove({}, (err) => {
//         done();
// });
// });

describe('/exceptions', function(){

    it('should return an array', function(done){
        chai.request(server)
            .get('/exceptions')
            .end(function(err, res){
                res.body.should.be.a('array');
                done();
            });
    });

    it('should return a status code 200', function(done){
        chai.request(server)
            .get('/exceptions')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });

    // it('should contain Exception models', function(done){
    //
    //     chai.request(server)
    //         .get('/exceptions')
    //         .end(function(err, res){
    //             console.log(res);
    //         });
    // });

});