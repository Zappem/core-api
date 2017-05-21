var Project = require('../../api/models/ProjectModel.js');

module.exports.make = function(data){
    return Project.create(data).save();
};

module.exports.addTeamMember = function(user, project){
    return Project.findOne({_id: project._id}).then(function(proj){
        proj.addTeamMember(user);
        user.addAssignedProject(project);
        return Promise.all([
            proj.save(),
            user.save()
        ]);
    })
};

module.exports.Project = Project;