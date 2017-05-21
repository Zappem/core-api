var Project = require('../../api/models/ProjectModel.js');

module.exports.make = function(data){
    return Project.create(data).save();
};

module.exports.addTeamMember = function(user, project){
	project.addTeamMember(user);
    user.addAssignedProject(project);

    return Promise.all([
        project.save(),
        user.save()
    ]);
};

module.exports.Project = Project;
