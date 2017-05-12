var Project = require('../models/ProjectModel.js');
var Services = {
    Exceptions: require('./ExceptionService.js'),
    Users: require('./UserService.js')
};

module.exports = {

    all: function(){
        return Project.find({});
    },

    findById: function(id){
        return Project.findOne({_id: id});
    },

    create: function(data){
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
        return Promise.all([
            Project.findOneAndUpdate({_id: id}, data),
            // We also need to update all exceptions within this project.
            Services.Exceptions.findByProjectId(id).then(function(exceptions){
                var excepPromise = [];
                exceptions.forEach(function(exception) {
                    exception.project.name = data.name;
                    excepPromise.push(exception.save());
                });
                return Promise.all(excepPromise);
            }),
            // We also need to update all users that belong to this project.
            Services.Users.findByProjectId(id).then(function(users){
                var usrPromise = [];
                users.forEach(function(user){
                    user.project.name = data.name;
                    usrPromise.push(user.save());
                });
                return Promise.all(usrPromise);
            })
        ]);
    },

    findByAssignedUser: function(id){
        return Project.find({"team.user_id":id});
    },

    search: function(term){

    }

};