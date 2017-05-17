module.exports = function(app){

    var exceptionController = require('./controllers/ExceptionController.js');
    var projectController = require('./controllers/ProjectController.js');
    var errorController = require('./controllers/ErrorController.js');
    var userController = require('./controllers/UserController.js');
    var instanceController = require('./controllers/InstanceController.js');
    var oauthController = require('./controllers/oauthController.js');

    var middleware = {
        auth: require('./services/AuthService.js'),
        project: require('./middleware/ProjectMiddleware.js')
    };

    app.route('/projects')
        .all(app.oauth.authenticate())
        .post(projectController.createNew)
        .get(projectController.showAll);

    app.route('/projects/:id')
        .all(app.oauth.authenticate())
        .all(middleware.project.doesExist)
        .put(middleware.project.hasAccess, projectController.updateById)
        .get(middleware.project.hasAccess, projectController.findById)
        .delete(middleware.project.hasAccess, projectController.deleteById);

    app.route('/projects/:id/team')
        .all(middleware.project.doesExist)
        .put(projectController.addTeamMembers)
        .delete(projectController.removeTeamMembers);

    app.route('/exceptions')
	    .get(exceptionController.showAll);

    app.route('/exceptions/:id')
        .get(exceptionController.findById);

    app.route('/exceptions/:id/assign')
        .put(exceptionController.assignUser)
        .delete(exceptionController.unassignUser);

    app.route('/instances')
        .get(instanceController.showAll);

    app.route('/instances/:id')
        .get(instanceController.findById);

    app.route('/error')
        .post(errorController.createNew);

    app.route('/users')
        .get(userController.showAll)
        .post(userController.createNew);

    app.route('/users/:id')
        .get(userController.findById)
        .put(userController.updateById);

    //app.use(app.oauth.authorize());
    //
    // app.route('/authorize')
    //     .get(oauthController.authorise);
    //
    app.route('/authorize')
        .all(app.oauth.token());
};
