var chai = require('../TestCase.js');

const generateNewError = function(project_id){
    return {
        obj: {
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
        },

        without: function(property) {
            var newobj = this.obj;
            delete newobj[property];
            return newobj;
        }

    };
};

var endpoint = "/error";

var runRequestWithoutPropertyAndExpectError = function(property){

    //console.log(error.without(property));
    var error = generateNewError("");

    it('should return a json object containing an error message', function(done) {
        chai.request(chai.server)
            .post("/error")
            .send(error.without(property))
            .end(function(err, res){
                assertValidationError(res, property);
                done();
            });
    });

    it('should return a status 400', function(done){
        chai.request(chai.server)
            .post("/error")
            .send(error.without(property))
            .end(function (err, res) {
                chai.expect(res).to.have.status(400);
                done();
            })
    });

};

var assertValidationError = function(res, property){

    chai.expect(res).to.be.json;
    chai.expect(res.body).to.have.property('success');
    chai.expect(res.body).to.have.property('error');
    chai.expect(res.body.success).to.be.false;
    chai.expect(res.body.error).to.equal('Validation Error');
    chai.expect(res.body.errors).to.be.array;
    // TODO: Assert errors contains property.

};


describe('Creating a new error without a Project ID', function () {
    runRequestWithoutPropertyAndExpectError('project_id');
});

describe('Creating a new error without a message', function () {
    runRequestWithoutPropertyAndExpectError('message');
});

describe('Creating a new error without a language', function () {
    runRequestWithoutPropertyAndExpectError('language');
});

describe('Creating a new error without a request_url', function() {
    runRequestWithoutPropertyAndExpectError('request_url');
});



