var Instance = require('../models/InstanceModel.js');
var Services = {
    Exceptions: require('./ExceptionService.js')
};

module.exports = {

    create: function (data) {
        return Instance.create(data).save();
        // return Promise.all([
        //     ,
        //     Services.Exceptions.incrementTimes(data.error_id)
        // ]);
    }

};