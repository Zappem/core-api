var chai = require('../../TestCase.js');

var Project = require('../../../api/models/ProjectModel.js');

describe('Getting all projects', function() {

    var endpoint = "/projects";

    it('should return json', function(done){
        chai.request(chai.server)
            .get(endpoint)
            .end(function (err, res) {
                chai.expect(res).to.be.json;
                done();
            });
    });

    it('should return a status 200', function(done) {
        chai.request(chai.server)
            .get(endpoint)
            .end(function (err, res) {
                chai.expect(res).to.have.status(200);
                done();
            });
    });

    it('should return an empty array when none saved', function(done){
        chai.request(chai.server)
            .get(endpoint)
            .end(function (err, res) {
                chai.expect(res).to.be.array;
                chai.expect(res.body).to.have.lengthOf(0);
                done();
            });
    });

    it('should return a populated array when some are saved', function(done){
        Project.create({name: "test"}).save().then(function() {
            chai.request(chai.server)
                .get(endpoint)
                .end(function (err, res) {
                    chai.expect(res).to.be.array;
                    chai.expect(res.body).to.have.lengthOf(1);
                    done();
                });
        });
    });

    it('should return arrays of Project objects', function(done){
        Project.create({name: "test"}).save().then(function() {
            chai.request(chai.server)
                .get(endpoint)
                .end(function (err, res) {
                    res.body.forEach(function(project){
                        // TODO: Ensure each object contains the keys.
                    });
                    done();
                });
        });
    });

});

describe('Getting a project with a valid ID', function() {

    it('should return a json object', function(done){
        Project.create({name: "test"}).save().then(function(proj) {
            chai.request(chai.server)
                .get("/projects/"+proj._id)
                .end(function (err, res) {
                    chai.expect(res).to.be.json;
                    done();
                });
        });
    });

    it('should return a status 200', function(done){
        Project.create({name: "test"}).save().then(function(proj) {
            chai.request(chai.server)
                .get("/projects/"+proj._id)
                .end(function (err, res) {
                    chai.expect(res).to.have.status(200);
                    done();
                });
        });
    });

});

describe('Getting a project with an invalid ID', function() {

    it('should return a json', function(done){
        chai.request(chai.server)
            .get("/projects/123")
            .end(function (err, res) {
                chai.expect(res).to.be.json;
                done();
            });
    });

    it('should return a status 404', function(done){
        chai.request(chai.server)
            .get("/projects/123")
            .end(function (err, res) {
                chai.expect(res).to.have.status(404);
                done();
            });
    });

});
