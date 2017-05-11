module.exports = {

    createNew: function(req, res){
        req.app.services.Errors.add(req.body).then(function(error){
            res.json(error);
        });
    }

};