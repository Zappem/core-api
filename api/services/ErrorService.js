const   ExceptionService = require('./ExceptionService.js'),
        InstanceService = require('./InstanceService.js');

var Validation = require('../validation/NewError.js');

module.exports = {

    /**
     * If the error has been seen before, we'll add an instance. Otherwise
     * we'll add a new error.
     * @param data
     */
    add: function(data){
        var obj = this,
            errors = [];

        return new Promise(function(resolve, reject){
            Validation(data).then(function(data){

                var create = obj.create(data);
                create.then(function(data){
                    return resolve(data);
                }).catch(function(data){
                    return reject(data);
                });

            }).catch(function(errors){
                return reject({
                    success: false,
                    error: "Validation Error",
                    errors: errors
                });
            });
        });

    },

    create: function(data) {
        var obj = this;
        // Have we seen this error before?
        return this.alreadyExists(data).then(function(exception){
            if(exception){
                data.error_id = exception._id;
                return obj.addNewInstance(data);
            } else {
                return obj.addNewException(data);
            }

        }).then(function(error){
            return error;
        });
    },

    alreadyExists: function(data){
        return ExceptionService.findOne({
            "project.project_id": data.project_id,
            message: data.message,
            language: data.language,
            environment: data.environment
        });
    },

    addNewInstance: function(data){
        return Promise.all([
            InstanceService.create(data),
            ExceptionService.incrementTimes(data.error_id)
        ]);
    },

    addNewException: function(data){
        return ExceptionService.create(data).then(function(exc){
            data.error_id = exc._id;
            return InstanceService.create(data);
        });
    }
};
