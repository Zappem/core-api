var chai = require('../../TestCase.js');

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

describe('/error - new error with invalid project ID', function(){

    var endpoint = "/error";

    it('should return a json object', function(){
        return chai.request(chai.server)
            .post(endpoint)
            .send(generateNewError(1123))
            .end(function(err, res){
                //res.body.should.be.a('object');
                chai.expect(res).to.be.json;
                done();
            });
    });

    it('shoud return a status 600', function(){
        // chai.request(chai.server)
        //     .post(endpoint)
        //     .send(generateNewError(1223))
        //     .then(function(err, res){
        //         console.log(res);
        //         //res.should.have.status(600);
        //         chai.expect(res).to.have.status(600);
        //         done();
        //     });
    });

});