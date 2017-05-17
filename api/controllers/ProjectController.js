var ProjectService = require('../services/ProjectService.js');

module.exports = {

    showAll: function(req, res){
        var user = res.locals.oauth.token.user;

        ProjectService.allAccessibleByUser(user).then(function(all){
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

    deleteById: function(req, res){
        // TODO: Implement this
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
    },

    addTeamMembers: function(req, res){
        ProjectService.addTeamMembers(req.params.id, req.body).then(function(proj){
            res.json(proj);
        });
    },

    removeTeamMembers: function(req, res){
        ProjectService.removeTeamMembers(req.params.id, req.body).then(function(proj){
            res.json(proj);
        });
    }
};
