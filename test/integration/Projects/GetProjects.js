var chai = require('../../TestCase.js');

var Project = require('../../../api/models/ProjectModel.js');

describe('/projects endpoint', function() {

    var endpoint = "/projects";

    describe('Getting all projects', function() {

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

    });

});