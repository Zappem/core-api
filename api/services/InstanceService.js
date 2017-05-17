var Instance = require('../models/InstanceModel.js');

module.exports = {

    all: function() {
        return Instance.find({});
    },

    create: function (data) {
        return Instance.create(data).save();
    },

    findById: function(id) {
        return Instance.findOne({_id: id});
    }

};