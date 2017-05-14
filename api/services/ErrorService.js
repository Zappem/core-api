var Services = {
    Exceptions: require('./ExceptionService.js'),
    Instances: require('./InstanceService.js')
};

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

        console.log(data);
        return new Promise(function(reject, resolve){
            errors = Validation.validate(data);
            if(errors.length){
                reject({
                    success: false,
                    error: "Validation Error",
                    errors: errors
                });
            }else{
                return resolve(obj.create(data));
            }
        });

    },

    create: function(data) {
        var obj = this;
        console.log(obj);
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
        return Services.Exceptions.findOne({
            message: data.message,
            language: data.language,
            environment: data.environment
        });
    },

    addNewInstance: function(data){
        return Promise.all([
            Services.Instances.create(data),
            Services.Exceptions.incrementTimes(data.error_id)
        ]);
    },

    addNewException: function(data){
        return Services.Exceptions.create(data).then(function(exc){
            data.error_id = exc._id;
            return Services.Instances.create(data);
        });
    }
};
