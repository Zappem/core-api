var Project = require('../models/ProjectModel.js');
var UserService = require('./UserService.js');

module.exports = {

    Services: {
        Exceptions: require('./ExceptionService.js'),
        Users: require('./UserService.js')
    },

    allAccessibleByUser: function(user){
        // Get an array of project ID's they have access to,
        if (user === undefined) throw new Error("No user specified");
        var projects = UserService.accessibleProjects(user);
        return Project.find({
            _id: {$in: projects}
        });
    },

    findById: function(id){
        return Project.findOne({_id: id});
    },

    doesProjectExist: function(id){
        return Project.count({_id: id}).then(function(count){
            return count !== 0 ? true : false;
        });
    },

    create: function(data){
        // TODO: Validation
        var create = Project.create({
            name: data.name
        });

        return create.save();
    },

    addTeamMembers: function(project, data){
        // TODO: Validation
        var getTeam = [],
            user = null;
        data.team.forEach(function (userid) {
            // Make an EmbeddedUser object and push it in.
            user = UserService.findById(userid);
            getTeam.push(user);
        });

        return Promise.all(getTeam).then(function (users) {
            users.forEach(function (user) {
                project.addTeamMember(user);
                user.addAssignedProject(project).save();
                // TODO: Update tokens too
            });
            return project.save();
        })
    },

    revokeTeamMembers: function(project, data){
        data.team.forEach(function (user) {
            project.removeTeamMember(user);
        });
        return project.save();
    },

    updateById: function(id, data){
        var obj = this;
        return Promise.all([
            Project.findOneAndUpdate({_id: id}, data),
            // We also need to update all exceptions within this project.
            obj.Services.Exceptions.findByProjectId(id).then(function(exceptions){
                var excepPromise = [];
                exceptions.forEach(function(exception) {
                    exception.project.name = data.name;
                    excepPromise.push(exception.save());
                });
                return Promise.all(excepPromise);
            }),
            // We also need to update all users that belong to this project.
            obj.Services.Users.findByProjectId(id).then(function(users){
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
    }

};