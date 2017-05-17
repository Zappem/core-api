var User = require('../models/UserModel.js'),
    Exception = require('../models/ExceptionModel.js');

module.exports = {

    doesExist: function(req, res, next){
        Exception.count({_id: req.params.id}).then(function(count){

            if(count > 0) return next();

            res.status(404).json({
                "error": "Exception not found"
            });
        })
    }
};
