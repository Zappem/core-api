module.exports = {

    init: function(app){

        var Projects = require('./services/ProjectService.js')(app),
            Instances = require('./services/InstanceService.js')(app),
            Exceptions = require('./services/ExceptionService.js')(app),
            Errors = require('./services/ErrorService.js')(app);

        return {
            Projects: Projects,
            Instances: Instances,
            Exceptions: Exceptions,
            Errors: Errors
        };
    }

};
