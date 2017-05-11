var Exception = require('../models/ExceptionModel.js');

var Services = {
    Instances: require('./InstanceService.js')
};

module.exports = {

    findByMessage: function (message) {
        return Exception.findOne({message:message});
    },

    create: function (data) {
        // Whenever a new exception is created, a new instance needs to be
        // made too.
        return Exception.create(data).save().then(function(error){
            data.error_id = error._id;
            return Services.Instances.create(data).save();
        });
    },

    incrementTimes: function(exception_id){
        return Exception.findOne({_id: exception_id}).then(function(exc){
            exc.times++;
            exc.lastSeen = Date.now();
            return exc.save();
        });
        // return Exception.findOneAndUpdate({_id: exception_id}, {
        //     times: ,
        //     lastSeen: Date.now
        // });
    }

};