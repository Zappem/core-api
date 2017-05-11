module.exports = function(app){

    var exceptionController = require('./controllers/ExceptionController.js');
    var projectController = require('./controllers/ProjectController.js');
    var errorController = require('./controllers/ErrorController.js');

    app.route('/projects')
        .post(projectController.createNew)
        .get(projectController.showAll);

    app.route('/projects/:id')
        .post(projectController.updateById)
        .get(projectController.findById);

    app.route('/exceptions')
	    .get(exceptionController.showAll);

    app.route('/error')
        .post(errorController.createNew);


	
};
