var User = require('../models/UserModel.js');
var Services = {
    Exceptions: require('./ExceptionService.js'),
    Projects: require('./ProjectService.js')
};

module.exports = {

    all: function(){
        return User.find({});
    },

    findById: function(id){
        return User.find({_id: id});
    },

    create: function(data){
        return User.create(data).save();
    },

    findByProjectId: function(id){
        return User.find({"project.project_id": id});
    },

    updateById: function(id, data){
        return Promise.all([
            User.findOneAndUpdate({_id:id}, data),
            // We also need to update all exceptions assigned to this user
            Services.Exceptions.findByAssignedUser(id).then(function(exceptions){
                var excpPromise = [];
                exceptions.forEach(function(exception){
                    exception.assigned_to.first_name = data.first_name;
                    exception.assigned_to.last_name = data.last_name;
                    exception.assigned_to.profile_img = data.profile_img;
                    excpPromise.push(exception.save());
                });
                return Promise.all(excpPromise);
            }),
            // We also need to update all projects they're a part of
            Services.Projects.findByAssignedUser(id).then(function(projects){
                var projPromise = [];
                projects.forEach(function(project){
                    project.team.first_name = data.first_name;
                    project.team.last_name = data.last_name;
                    project.team.profile_img = data.profile_img;
                    projPromise.push(project.save());
                });
                return Promise.all(projPromise);
            })
        ]);
    }

};