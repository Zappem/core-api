const ErrorService = require('../services/ErrorService.js');

module.exports = {

    createNew: function(req, res){
        ErrorService.add(req.body).then(function(error){
            res.json(error);
        });
    }

};