var Instance = require('../models/InstanceModel.js');
var Services = {
    Exceptions: require('./ExceptionService.js')
};

module.exports = {

    create: function (data) {
        return Promise.all([
            Instance.create(data).save(),
            Services.Exceptions.incrementTimes(data.error_id)
        ]);
    }

};