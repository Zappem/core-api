// // //During the test the env variable is set to test
// // process.env.NODE_ENV = 'test';
// // process.env.DB = 'nedb://memory';
// //
// // //let mongoose = require("mongoose");
// // //let Book = require('../app/models/book');
// //
// // //Require the dev-dependencies
// // let chai = require('chai');
// // let chaiHttp = require('chai-http');
// // let server = require('../../../api/index');
// // let should = chai.should();
// //
// // chai.use(chaiHttp);
// //Our parent block
// // describe('Books', function(){
// //     beforeEach((done) => { //Before each test we empty the database
// //     Book.remove({}, (err) => {
// //         done();
// // });
// // });
//
// const chai = require('../../TestCase.js');
//
// const addNewProject = function(data) {
//     var Project = require('../../../api/models/ProjectModel.js');
//     return Project.create(data).save();
// };
//
// const doesExceptionExist = function(data) {
//     var Exception = require('../../../api/models/ExceptionModel.js');
//     return Exception.findOne(data);
// };
//
// describe('/error - new with valid data', function(){
//
//     it('should return an object', function(done){
//         addNewProject({name: "Object Test"}).then(function(project) {
//             chai.request(chai.server)
//                 .post('/error')
//                 .send({
//                     message: 'ErrorException Foo Bar',
//                     project_id: project._id,
//                     language: 'PHP',
//                     environment: 'local'
//                 })
//                 .end(function (err, res) {
//                     res.body.should.be.a('object');
//                     done();
//                 });
//         });
//     });
//
//     it('should return a status 200', function(done){
//         addNewProject({name: "Status Test"}).then(function(project) {
//             chai.request(chai.server)
//                 .post('/error')
//                 .send({
//                     message: 'Another Strange One',
//                     project_id: project._id,
//                     language: 'PHP',
//                     environment: 'local'
//                 })
//                 .end(function (err, res) {
//                     res.should.have.status(200);
//                     done();
//                 });
//         });
//     });
//
//     it('should\'ve created an Exception row', function(done){
//         addNewProject({name: "Exception Test"}).then(function(project) {
//             chai.request(chai.server)
//                 .post('/error')
//                 .send({
//                     message: 'Syntax Error Lol',
//                     project_id: project._id,
//                     language: 'JavaScript',
//                     environment: 'production'
//                 })
//                 .end(function (err, res) {
//                     doesExceptionExist({
//                         "project.project_id": project._id,
//                         "project.name": project.name,
//                         message: 'Syntax Error Lol',
//                         times: 1
//                     }).then(function(exists){
//                         chai.assert(true, exists);
//                         done();
//                     });
//                 });
//         });
//     });
//
//     // it('should\'ve returned an Error model', function(done){
//     //    done();
//     // });
//     //
//     // it('should\'ve created an Instance row', function(done){
//     //     done();
//     // });
//     //
//     // it('should\'ve set the Exception ID in the Instance row', function(done){
//     //     done();
//     // });
//     //
//     // it('should contain Exception models', function(done){
//     //     done();
//     // });
//
// });