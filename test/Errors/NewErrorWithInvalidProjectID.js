var chai = require('../TestCase.js');

const generateNewError = function(project_id){
    return {
        message: "Some Test Error",
        project_id: project_id,
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

var endpoint = "/error";
var should = chai.should();

describe('Creating a new error with an invalid Project ID', function () {

    var error = generateNewError(1123);

    it('should return a json object containing an error message', function (done) {
        chai.request(chai.server)
            .post(endpoint)
            .send(error)
            .end(function (err, res) {
                chai.expect(res).to.be.json;
                chai.expect(res.body).to.have.property('success');
                chai.expect(res.body).to.have.property('error');
                chai.expect(res.body).to.have.property('errors');
                chai.expect(res.body.success).to.be.false;
                chai.expect(res.body.error).to.equal('Validation Error');
                chai.expect(res.body.errors).to.be.array;
                done();
            });
    });

    it('should return a status 400', function (done) {
        chai.request(chai.server)
            .post(endpoint)
            .send(error)
            .end(function (err, res) {
                chai.expect(res).to.have.status(400);
                done();
            })
    });

});