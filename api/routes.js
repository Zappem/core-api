module.exports = function(app){

    var exceptionController = require('./controllers/ExceptionController.js');
    var projectController = require('./controllers/ProjectController.js');

    app.route('/projects')
        .post(projectController.createNew)
        .get(projectController.showAll);

    app.route('/exceptions')
	    .get(exceptionController.showAll);


	
};
