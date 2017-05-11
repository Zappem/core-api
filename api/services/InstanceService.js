var Instance = require('../models/InstanceModel.js');

module.exports = {

    create: function (data) {
        return Instance.create(data).save();
    }

};