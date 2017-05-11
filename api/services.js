module.exports = {

    init: function(app){
        return {
            "Projects": require('./services/ProjectService.js')(app)
        };
    }

};
