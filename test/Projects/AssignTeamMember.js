var chai = require('../TestCase.js');
var Project = require('../../api/models/ProjectModel.js');
var User = require('../../api/models/UserModel.js');

var makeDummyProject = function() {
    return Project.create({
        name: "test"
    }).save();
};

var makeDummyUser = function() {
    return User.create({
        first_name: "Dan",
        last_name: "Johnson",
        email: "test@example.com",
        password: "password"
    }).save();
};

var makeRequest = function(url, data){
    return new Promise(function(resolve, reject){
        chai.request(chai.server)
            .put(url)
            .send(data)
            .end(function(err, res){
                if(err) return reject(err);
                return resolve(res);
            });
    });
};

describe('Assigning a valid user to a project', function(){

    var validUserRequest = function(){
        return new Promise(function(resolve, reject){
            return Promise.all([
                makeDummyProject(),
                makeDummyUser()
            ]).then(function(data){
                makeRequest("/projects/"+data[0]._id+"/team", {
                    team: [data[1]._id]
                }).then(function(res){
                    resolve({
                        res: res,
                        data: data
                    });
                }).catch(function(res){
                    reject({
                        res: res,
                        data: data
                    });
                });
            });
        });
    };

    it('should return a status 200', function(done){
        validUserRequest().then(function(res){
            chai.expect(res.res.status).to.equal(200);
            done();
        });
    });

    it('should return a json object of the new project', function(done){
        validUserRequest().then(function(res){
            chai.expect(res.res).to.be.json;
            done();
        });
    });

    it('should put user data inside project team', function(done) {
        validUserRequest().then(function(res){
             Project.findOne({_id: res.data[0]._id}).then(function(project){
                 chai.expect(project.team).to.have.lengthOf(1);
                 chai.expect(project.team[0].user_id).to.equal(res.data[1]._id);
                 chai.expect(project.team[0].first_name).to.equal(res.data[1].first_name);
                 chai.expect(project.team[0].last_name).to.equal(res.data[1].last_name);
                 done();
             });
        });
    });

});

describe('Assigning multiple valid users to a project', function(){

    var multipleValidUserRequest = function(){
        return new Promise(function(resolve, reject){
            return Promise.all([
                makeDummyProject(),
                makeDummyUser(),
                makeDummyUser(),
                makeDummyUser()
            ]).then(function(data){
                makeRequest("/projects/"+data[0]._id+"/team", {
                    team: [data[1]._id, data[1]._id, data[2]._id]
                }).then(function(res){
                    resolve({
                        res: res,
                        data: data
                    });
                });
            });
        });
    };

    it('should put user data inside project team', function(done) {
        multipleValidUserRequest().then(function(res){
            return Project.findOne({_id: res.data[0]._id});
        }).then(function(project){
            chai.expect(project.team).to.have.lengthOf(3);
            done();
        });
    });

});

describe('Assigning a valid user and an invalid user to a project', function(){

    var validAndInvalidRequest = function(){
        return new Promise(function(resolve, reject){
            return Promise.all([
                makeDummyProject(),
                makeDummyUser()
            ]).then(function(data){
                makeRequest("/projects/"+data[0]._id+"/team", {
                    team: [data[1]._id, "somethingInvalid"]
                }).then(function(res){
                    resolve({
                        res: res,
                        data: data
                    });
                });
            });
        });
    };

    it('should return a 400', function(done) {
        validAndInvalidRequest().then(function (res) {
            chai.expect(res.res.status).to.equal(400);
            done();
        });
    });

    it('should not assign any of the users', function(done) {
        validAndInvalidRequest().then(function (res) {
            return Project.findOne({_id: res.data[0]._id});
        }).then(function(project){
            chai.expect(project.team).to.have.lengthOf(0);
            done();
        });
    });
});

describe('Assigning a valid user to an invalid project', function(){

    var invalidRequest = function(){
        return new Promise(function(resolve, reject){
            return Promise.all([
                makeDummyUser()
            ]).then(function(data){
                makeRequest("/projects/invalid/team", {
                    team: [data[0]._id]
                }).then(function(res){
                    resolve({
                        res: res,
                        data: data
                    });
                });
            });
        });
    };

    it('should return a status 400', function(done){
        invalidRequest().then(function(res){
            chai.expect(res.res.status).to.be(400);
        });
    })
});

describe('Assigning multiple valid users to an invalid project', function(){

});

describe('Assigning a valid user and an invalid user to an invalid project', function(){

});

describe('Assigning an empty array to a valid project', function(){

});

describe('Assigning an empty array to an invalid project', function(){

});