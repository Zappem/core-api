var Exception = require('../models/ExceptionModel.js');
var Services = {
    Projects: require('./ProjectService.js')
};

module.exports = {

    findByMessage: function (message) {
        return Exception.findOne({message:message});
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
    }

};