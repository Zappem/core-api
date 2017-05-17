var User = require('../models/UserModel.js'),
    Instance = require('../models/InstanceModel.js');

module.exports = {

    doesExist: function(req, res, next){
        Instance.count({_id: req.params.id}).then(function(count){

            if(count > 0) return next();

            res.status(404).json({
                "error": "Instance not found"
            });
        })
    }
};
