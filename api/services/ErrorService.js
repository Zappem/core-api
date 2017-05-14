// var Services = {
//     Exceptions: require('./ExceptionService.js'),
//     Instances: require('./InstanceService.js')
// };

const   ExceptionService = require('./ExceptionService.js'),
        InstanceService = require('./InstanceService.js');

module.exports = {

    /**
     * If the error has been seen before, we'll add an instance. Otherwise
     * we'll add a new error.
     * @param data
     */
    add: function(data){
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
        var obj = this;
        return ExceptionService.create(data).then(function(exc){
            data.error_id = exc._id;
            return InstanceService.create(data);
        });
    }
};
