module.exports = {

    init: function(app){

        var Projects = require('./services/ProjectService.js'),
            Instances = require('./services/InstanceService.js'),
            Exceptions = require('./services/ExceptionService.js'),
            Errors = require('./services/ErrorService.js');

        return {
            Projects: Projects,
            Instances: Instances,
            Exceptions: Exceptions,
            Errors: Errors
        };
    }

};
