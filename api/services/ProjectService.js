module.exports = function(app){

    var Project = require('../models/ProjectModel.js');
    var Services = app.services;

    return {
        all: function(){
            return Project.find({});
        },

        findById: function(id){
            return Project.find({_id: id});
        },

        create: function(data){
            // TODO: Validation
            var create = Project.create({
                name: data.name,

            });

            data.team.forEach(function(userid){
                //create.addTeamMember
                Services.Users.
            });
            return create.save();
        },

        search: function(term){

        }


    };

};