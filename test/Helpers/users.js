var User = require('../../api/models/UserModel.js');

module.exports.make = function(data){
    return User.create(data).save();
};