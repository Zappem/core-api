var chai = require('../../TestCase.js');
var User = require('../../../api/models/UserModel.js');

var createUser = function(){
    return chai.helpers.users.make({
        first_name: "Dan",
        last_name: "Johnson",
        email: "tests@example.com",
        password: "password"
    });
};

var makeValidAuthoriseRequest = function(callback){
    createUser().then(function() {
        chai.request(chai.server)
            .post('/authorize')
            .send('grant_type=password')
            .send('username=tests@example.com')
            .send('password=password')
            .auth('zappem-base', 'j5)x>UU~MVRP@pdN')
            .end(function (err, res) {
                callback(err, res);
            })
    });
};

describe('Getting an access token with valid data using password grant', function(){

    it('should return a json object', function(done){
        makeValidAuthoriseRequest(function(err, res){
            chai.expect(res).to.be.json;
            done();
        })
    });

    it('should contain an access_token', function(done){
        makeValidAuthoriseRequest(function(err, res){
            chai.expect(res.body).to.have.property('access_token');
            chai.expect(res.body.access_token).to.not.be.empty;
            done();
        });
    });

    it('should contain a bearer token type', function(done){
        makeValidAuthoriseRequest(function(err, res){
            chai.expect(res.body).to.have.property('token_type');
            chai.expect(res.body.token_type).to.equal('Bearer');
            done();
        });
    });

    it('should contain a refresh token', function(done){
        makeValidAuthoriseRequest(function(err, res){
            chai.expect(res.body).to.have.property('refresh_token');
            chai.expect(res.body.refresh_token).to.not.be.empty;
            done();
        });
    });

});

describe('Getting an access token with invalid client using password grant', function(){

});