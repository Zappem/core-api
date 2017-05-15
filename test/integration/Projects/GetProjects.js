var chai = require('../../TestCase.js');

var Project = require('../../../api/models/ProjectModel.js');

describe('/exceptions endpoint', function() {

    var endpoint = "/exceptions";

    describe('Getting all exceptions', function() {

        it('should return an empty array when none saved', function(done){
            chai.request(chai.server)
                .get(endpoint)
                .end(function (err, res) {
                    chai.expect(res).to.be.array;
                    chai.expect(res.body).to.have.lengthOf(0);
                    done();
                });
        });

    });

});