var chai = require('../../TestCase.js');
var ProjectService = require('../../../api/services/ProjectService.js');

describe('Getting all accessible by user', function(){

    // Make a cheeky user first.
    var user;
    beforeEach(function(ready){
        chai.helpers.users.make({
            first_name: "Test",
            last_name: "User",
            email: "test@example.com",
            password: "password"
        }).then(function(newUsr){
            user = newUsr;
            ready();
        });
    });

    describe('when user has no projects accessible', function() {

        it('should return an array', function (done) {
            ProjectService.allAccessibleByUser(user).then(function (projects) {
                chai.expect(projects).to.be.array;
                done();
            })
        });

        it('should be an empty array', function (done) {
            ProjectService.allAccessibleByUser(user).then(function (projects) {
                chai.expect(projects).to.have.lengthOf(0);
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
            ProjectService.allAccessibleByUser(user).then(function (projects) {
                chai.expect(projects).to.be.array;
                done();
            });
        });

        it('should contain one element', function(done){
            ProjectService.allAccessibleByUser(user).then(function (projects) {
                chai.expect(projects).to.have.lengthOf(1);
                done();
            });
        });

        it('should contain the correct project id', function(done){
            ProjectService.allAccessibleByUser(user).then(function(projects){
                chai.expect(projects[0]._id).to.equal(project._id);
                done();
            });
        });

        it('should contain the correct project name', function(done){
            ProjectService.allAccessibleByUser(user).then(function (projects) {
                chai.expect(projects[0].name).to.equal('Test Project');
                done();
            });
        });

    });

});