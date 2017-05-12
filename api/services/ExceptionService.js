var Exception = require('../models/ExceptionModel.js');
var Services = {
    Projects: require('./ProjectService.js'),
    Users: require('./UserService.js')
};

module.exports = {

    all: function(){
        return Exception.find({});
    },

    findByMessage: function (message) {
        return this.findOne({message:message});
    },

    findByAssignedUser: function(id) {
        return Exception.find({"assigned_to.user_id":id});
    },

    findById: function(id){
        return this.findOne({_id: id});
    },

    findOne: function(query) {
        return Exception.findOne(query);
    },

    findByProjectId: function(id) {
        return Exception.find({"project.project_id": id});
    },

    create: function (data) {
        // Get the project first.
        return Services.Projects.findById(data.projectID).then(function(proj){
            data.project = {
                project_id: proj._id,
                name: proj.name
            };
            return Exception.create(data).save();
        });
    },

    incrementTimes: function(exception_id){
        return Exception.findOne({_id: exception_id}).then(function(exc){
            exc.times++;
            exc.lastSeen = Date.now();
            return exc.save();
        });
    },

    assignUser: function(exception_id, user_id){
        var obj = this;
        return Promise.all([
            Services.Users.findById(user_id),
            obj.findById(exception_id)
        ]).then(function(data){
            data[1].assigned_to.user_id = user_id;
            data[1].assigned_to.first_name = data[0].first_name;
            data[1].assigned_to.last_name = data[0].last_name;
            data[1].assigned_to.profile_img = data[0].profile_img;
            return Promise.all([
                data[1].save(),
                Services.Users.addAssignedException(user_id, exception_id)
            ]);
        });
    },

    unassignUser: function(exception_id, user_id){
        this.findById(exception_id).then(function(exception){
            exception.assigned_to = {};
            return Promise.all([
                exception.save(),
                Services.Users.removeAssignedException(user_id, exception_id)
            ]);
        });
    }

};