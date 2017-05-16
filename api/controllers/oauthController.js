const AuthService = require('../services/AuthService.js');

module.exports = {

    authorise: function(req, res) {
        console.log(res.locals);
        // AuthService.token(req, res, {}).then(function(){
        //     console.log(token);
        // });

    }

};