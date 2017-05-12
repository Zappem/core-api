var ExceptionService = require('../services/ExceptionService.js');

module.exports = {

	showAll: function(req, res){
	    ExceptionService.all().then(function(exceptions){
			res.json(exceptions);
		});
	},

	findById: function(req, res){
		ExceptionService.findById(req.params.id).then(function(exception){
			res.json(exception);
		});
	},

	assignUser: function(req, res){
		ExceptionService.assignUser(req.params.id, req.body.user_id).then(function(exception){
			res.json(exception);
		});
	},

	unassignUser: function(req, res){
		ExceptionService.unassignUser(req.params.id, req.body.user_id).then(function(exception){
			res.json(exception);
		});
	}

}
