var User = require('../models/UserModel.js'),
    Project = require('../models/ProjectModel.js');

module.exports = {

    hasAccess: function(req, res, next){
        //console.log(res.locals);
        // Does the user have permission to view this?
        User.findOne({_id: res.locals.oauth.token.userId}).then(function(user){
            user.projects.forEach(function(project){
                if(project._id == req.params.id) next()
            });

            res.status(403).json({
                "error": "You don't have access to this project"
            });

        });
    },

    doesExist: function(req, res, next){
        Project.count({_id: req.params.id}).then(function(count){
            if(count > 0) next();

            res.status(404).json({
                "error": "Project not found"
            });
        })
    }
};
