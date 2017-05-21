var chai = require('../../TestCase.js');
var ProjectService = require('../../../api/services/ProjectService.js');

describe('Checking if project exists', function(){

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

        it('should return true', function(done){
            ProjectService.doesProjectExist(project._id).then(function(check){
                chai.expect(check).to.be.true;
                done();
            });
        });

    });

    describe('when it doesn\'t exist', function(){

        it('should return false', function(done){
            ProjectService.doesProjectExist(123).then(function(check){
                chai.expect(check).to.be.false;
                done();
            });
        });

    });

});