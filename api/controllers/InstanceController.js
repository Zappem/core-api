var InstanceService = require('../services/InstanceService.js');

module.exports = {

    showAll: function(req, res){
        InstanceService.all().then(function(instances){
            res.json(instances);
        });
    },

    findById: function(req, res){
        InstanceService.findById(req.params.id).then(function(instance){
            res.json(instance);
        });
    }
};