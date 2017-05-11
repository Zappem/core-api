module.exports = {

    showAll: function(req, res){
        req.app.services.Projects.all().then(function(all){
            res.send(all);
        });
    },

    findById: function(req, res){
        req.app.services.Projects.findById(req.params.id).then(function(proj){
            res.json(proj);
        });
    },

    updateById: function(req, res){
        req.app.services.Projects.updateById(req.params.id, req.body).then(function(proj){
            res.json(proj);
        });
    },

    createNew: function(req, res){
        req.app.services.Projects.create(req.body).then(function(proj){
            res.json(proj)
        });
    }
};
