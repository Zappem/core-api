var chai = require('../../TestCase.js');
var ProjectService = require('../../../api/services/ProjectService.js');

describe('Getting all accessible by user', function(){

    // Make a cheeky user first.
    var user;
    var token;
    beforeEach(function(ready){
        chai.helpers.users.make({
            first_name: "Test",
            last_name: "User",
            email: "test@example.com",
            password: "password"
        }).then(function(newUsr){
			user = newUsr;
            chai.helpers.auth.getTokenForUser(newUsr).then(function(access_token){
                token = access_token.accessToken;
                ready();
            });
        });
    });

    var makeRequestWithAuth = function(){
        return chai.request(chai.server)
			.get("/projects")
			.set('Authorization', 'Bearer '+token);
    };

    var makeRequestWithoutAuth = function(){
        return chai.request(chai.server)
            .get("/projects");
    };

    describe('when user has no projects accessible', function() {

        it('should return a json object', function (done) {
            makeRequestWithAuth().then(function(output){
                chai.expect(output).to.be.json;
                done();
            });
        });

        it('should be an empty array', function (done) {
            makeRequestWithAuth().then(function(output){
                chai.expect(output.body).to.have.lengthOf(0);
                done();
            })
        });

    });

    describe('when user has one project accessible', function() {

        var project = null;
        beforeEach(function(ready){
            chai.helpers.projects.make({
                name: "Test Project"
            }).then(function (newProj) {
                project = newProj;
                chai.helpers.projects.addTeamMember(user, project).then(function(){
                    ready()
                });
            });
        });

        it('should return an array', function(done){
            makeRequestWithAuth().then(function(output){
                chai.expect(output.body).to.be.array;
                done();
            });
        });

        it('should contain one object', function(done){
            makeRequestWithAuth().then(function(output){
                chai.expect(output.body).to.have.lengthOf(1);
                chai.expect(output.body[0]).to.be.object;
                done();
            });
        });

        it('should contain the correct project id', function(done){
            makeRequestWithAuth().then(function(output){
                chai.expect(output.body[0]._id).to.equal(project._id);
                done();
            });
        });

        it('should contain the correct project name', function(done){
            makeRequestWithAuth().then(function(output){
                chai.expect(output.body[0].name).to.equal('Test Project');
                done();
            });
        });

    });

});

//     describe('when one is assigned to another user', function(){
//
//         var project = null;
//
//         beforeEach(function(ready){
//             chai.helpers.users.make({
//                 first_name: "Another",
//                 last_name: "User",
//                 email: "another@example.com",
//                 password: "p4ssw0rd"
//             }).then(function(otheruser){
//                 chai.helpers.projects.make({
//                     name: "Test Project"
//                 }).then(function (newProj) {
//                     project = newProj;
//                     chai.helpers.projects.addTeamMember(otheruser, newProj).then(function(){
//                         ready()
//                     });
//                 });
//             });
//         });
//
//         it('should return an array', function (done) {
//             ProjectService.allAccessibleByUser(user).then(function (projects) {
//                 chai.expect(projects).to.be.array;
//                 done();
//             })
//         });
//
//         it('should be an empty array', function (done) {
//             ProjectService.allAccessibleByUser(user).then(function (projects) {
//                 chai.expect(projects).to.have.lengthOf(0);
//                 done();
//             })
//         });
//
//     });
//
//     describe('when one is assigned to this user and another assigned to the other', function(){
//
//
//         var project = null;
//
//         beforeEach(function (ready) {
//             chai.helpers.users.make({
//                 first_name: "Another",
//                 last_name: "User",
//                 email: "another@example.com",
//                 password: "p4ssw0rd"
//             }).then(function (otheruser) {
//                 Promise.all([
//                     chai.helpers.projects.make({
//                         name: "Test Project"
//                     }).then(function (newProj) {
//                         return chai.helpers.projects.addTeamMember(otheruser, newProj);
//                     }),
//                     chai.helpers.projects.make({
//                         name: "Another Project"
//                     }).then(function (newProj){
//                         project = newProj;
//                         return chai.helpers.projects.addTeamMember(user, newProj);
//                     })
//                 ]).then(function(){
//                     ready();
//                 });
//             });
//         });
//
//         it('should return an array', function (done) {
//             ProjectService.allAccessibleByUser(user).then(function (projects) {
//                 chai.expect(projects).to.be.array;
//                 done();
//             })
//         });
//
//         it('should only contain 1 object', function (done) {
//             ProjectService.allAccessibleByUser(user).then(function (projects) {
//                 chai.expect(projects).to.have.lengthOf(1);
//                 chai.expect(projects[0]).to.be.object;
//                 done();
//             })
//         });
//
//         it('should contain the project id we assigned', function (done) {
//             ProjectService.allAccessibleByUser(user).then(function (projects) {
//                 chai.expect(projects[0]._id).to.equal(project._id);
//                 done();
//             });
//         });
//
//     });
//
//     describe('when user has two accessible', function(){
//
//         var project1 = null;
//         var project2 = null;
//
//         beforeEach(function (ready) {
//
//             Promise.all([
//                 chai.helpers.projects.make({
//                     name: "Test Project"
//                 }).then(function (newProj) {
//                     project1 = newProj;
//                     return chai.helpers.projects.addTeamMember(user, newProj);
//                 }),
//                 chai.helpers.projects.make({
//                     name: "Another Project"
//                 }).then(function (newProj){
//                     project2 = newProj;
//                     return chai.helpers.projects.addTeamMember(user, newProj);
//                 })
//             ]).then(function(){
//                 ready();
//             });
//
//         });
//
//         it('should return an array', function (done) {
//             ProjectService.allAccessibleByUser(user).then(function (projects) {
//                 chai.expect(projects).to.be.array;
//                 done();
//             })
//         });
//
//         it('should contain 2 object', function (done) {
//             ProjectService.allAccessibleByUser(user).then(function (projects) {
//                 chai.expect(projects).to.have.lengthOf(2);
//                 chai.expect(projects[0]).to.be.object;
//                 chai.expect(projects[1]).to.be.object;
//                 done();
//             })
//         });
//
//         it('should contain the project ids we assigned', function (done) {
//             ProjectService.allAccessibleByUser(user).then(function (projects) {
//                 var projectids = [];
//                 projects.forEach(function(project){
//                     projectids.push(project._id);
//                 });
//                 chai.expect(projectids).to.contain(project1._id);
//                 chai.expect(projectids).to.contain(project2._id);
//                 done();
//             });
//         });
//
//     });
//
//     // TODO: Implement this test
//     // describe('when no user is specified', function(){
//     //
//     //     it('should throw an error', function(){
//     //     })
//     // });
// });
