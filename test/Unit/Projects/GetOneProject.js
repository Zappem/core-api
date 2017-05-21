var chai = require('../../TestCase.js');
var ProjectService = require('../../../api/services/ProjectService.js');

describe('Getting one project', function(){

    describe('when it exists', function(){

        var project;
        beforeEach(function(ready) {
            chai.helpers.projects.make({
                name: "Test Project"
            }).then(function(proj){
                project = proj;
                ready();
            });
        });

        it('should return an object', function(done){
            ProjectService.findById(project._id).then(function(project){
                chai.expect(project).to.be.object;
                done();
            });
        });

        it('should contain the correct project name', function(done){
            ProjectService.findById(project._id).then(function(project){
                chai.expect(project).to.have.property('name');
                chai.expect(project.name).to.equal('Test Project');
                done();
            });
        });

    });

    describe('when it doesn\'t exist', function(){

        it('should return null', function(done){
            ProjectService.findById(123).then(function(project){
                chai.expect(project).to.be.null;
                done();
            });
        });
        
    });

});