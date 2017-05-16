var chai = require('../TestCase.js');

var Exception = require('../../api/models/ExceptionModel.js');
var Instance = require('../../api/models/InstanceModel.js');
var Project = require('../../api/models/ProjectModel.js');

const addNewProject = function(data) {
    return Project.create(data).save();
};

const doesExceptionExist = function(data) {
    return Exception.findOne(data);
};

const doesInstanceExist = function(data) {
    return Instance.findOne(data);
};

const generateNewError = function(project){
    return {
        message: "Some Test Error",
        project_id: project._id,
        language: "PHP",
        environment: "local",
        request_url: "http://zappem.xyz",
        request_method: "POST",
        request_ip: "123.255.123.255",
        stack: [
            {file: "/lol.php", line: 523}
        ],
        request_headers: {
            "content-type": "text/html",
            "something": "foo/bar"
        }

    };
};

describe('/error endpoint', function() {

    describe('Creating a new error with valid data', function () {

        var endpoint = "/error";

        it('should return a json object', function (done) {
            addNewProject({name: "Object Test"}).then(function (project) {
                chai.request(chai.server)
                    .post(endpoint)
                    .send(generateNewError(project))
                    .end(function (err, res) {
                        chai.expect(res).to.be.json;
                        done();
                    });
            });
        });

        it('should return a status 200', function (done) {

            addNewProject({name: "Status Test"}).then(function (project) {
                chai.request(chai.server)
                    .post(endpoint)
                    .send(generateNewError(project))
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                    });
            });
        });

        it('should create an Exception row', function (done) {
            addNewProject({name: "Exception Test"}).then(function (project) {

                var expected = {
                    "message": "Some Test Error",
                    "times": 1
                };

                chai.request(chai.server)
                    .post(endpoint)
                    .send(generateNewError(project))
                    .end(function (err, res) {
                        doesExceptionExist(expected).then(function (exists) {
                            chai.assert(true, exists);
                            done();
                        });
                    });
            });
        });

        it('should create an Instance row', function (done) {
            addNewProject({name: "Instance Test"}).then(function (project) {

                var expected = {
                    "request_url": "http://zappem.xyz",
                    "request_method": "POST",
                    "request_headers.content-type": "text/html",
                    "request_headers.something": "foo/bar",
                    "request_ip": "123.255.123.255"
                };

                chai.request(chai.server)
                    .post(endpoint)
                    .send(generateNewError(project))
                    .end(function (err, res) {
                        doesInstanceExist(expected).then(function (exists) {
                            chai.assert(true, exists);
                            done();
                        });
                    });
            });
        });

        it('should put Project data inside exception', function (done) {
            addNewProject({name: "Project Data Test"}).then(function (project) {

                var expected = {
                    "project.project_id": project._id,
                    "project.name": project.name,
                };

                chai.request(chai.server)
                    .post(endpoint)
                    .send(generateNewError(project))
                    .end(function (err, res) {
                        doesExceptionExist(expected).then(function (exists) {
                            chai.assert(true, exists);
                            done();
                        });
                    });
            });
        });

    });

});