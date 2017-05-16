var ProjectService = require('../services/ProjectService.js');

module.exports = {

    showAll: function(req, res){
        ProjectService.all().then(function(all){
            res.json(all);
        });
    },

    findById: function(req, res){
        ProjectService.findById(req.params.id).then(function(proj){

            // TODO: Clean up the error handling here.
            if(proj === null)
                return res.status(404).json({
                    error: "No project found"
                });

            res.json(proj);
        });
    },

    updateById: function(req, res){
        ProjectService.updateById(req.params.id, req.body).then(function(proj){
            res.json(proj);
        });
    },

    createNew: function(req, res){
        ProjectService.create(req.body).then(function(proj){
            res.json(proj)
        });
    }
};
