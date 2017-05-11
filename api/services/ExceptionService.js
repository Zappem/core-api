var Exception = require('../models/ExceptionModel.js');

module.exports = {

    findByMessage: function (message) {
        return Exception.findOne({message:message});
    },

    create: function (data) {
        return Exception.create(data).save();
    },

    incrementTimes: function(exception_id){
        return Exception.findOne({_id: exception_id}).then(function(exc){
            exc.times++;
            exc.lastSeen = Date.now();
            return exc.save();
        });
    }

};