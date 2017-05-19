var User = require('../models/UserModel.js');

module.exports = {

    doesExist: function(req, res, next){
        User.count({_id: req.params.id}).then(function(count){

            if(count > 0) return next();

            res.status(404).json({
                "error": "User not found"
            });
        })
    }
};
