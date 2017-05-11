var Project = require('../models/ProjectModel.js');
var Services = {
    Exceptions: require('./ExceptionService.js')
};

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

    updateById: function(id, data){
        var inners = [];
        return Promise.all([
            Project.findOneAndUpdate({_id: id}, data),
            // We also need to update all exceptions within this project.
            Services.Exceptions.findByProjectId(id).then(function(exceptions){
                exceptions.forEach(function(exception) {
                    exception.project.name = data.name;
                    inners.push(exception.save());
                });
                return Promise.all(inners);
            })
        ]);
    },

    search: function(term){

    }

};