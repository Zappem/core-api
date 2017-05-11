module.exports = function(app){

    var Project = require('../models/ProjectModel.js');
    var Services = app.services;

    return {
        all: function(callback){
            return Project.find({}).then(function(proj){
                return proj;
            });
        },

        findById: function(id){
            return Project.find({_id: id}).then(function(proj){
                return proj;
            });
        },

        create: function(data, callback){
            // TODO: Validation
            var create = Project.create({
                name: data.name
            });

            data.team.forEach(function(userid){
                //create.addTeamMember
            });

            return create.save().then(callback);
        },

        search: function(term){

        }


    };

};