var UserService = require('../services/UserService.js');

module.exports = {
    showAll: function(req, res){
        UserService.all().then(function(all){
            res.json(all);
        });
    },

    createNew: function(req, res){
        console.log(req.body);
        UserService.create(req.body).then(function(user){
            res.json(user);
        });
    },

    findById: function(req, res){
        UserService.findById(req.params.id).then(function(user){
            res.json(user);
        });
    },

    updateById: function(req, res){
        UserService.updateById(req.params.id, req.body).then(function(user){
            res.json(user);
        });
    }
};