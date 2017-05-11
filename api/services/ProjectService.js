var Project = require('../models/ProjectModel.js');

module.exports = {

    all: function(){
        return Project.find({});
    },

    findById: function(id){
        return Project.findOne({_id: id});
    },

    create: function(data, callback){
        // TODO: Validation
        var create = Project.create({
            name: data.name
        });

        data.team.forEach(function(userid){
            //create.addTeamMember
        });

        return create.save();
    },

    search: function(term){

    }

};