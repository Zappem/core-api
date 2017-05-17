var validate = require('validate.js');
var ProjectService = require('../services/ProjectService.js');

validate.validators.doesProjectExist = function(value){
    return new validate.Promise(function(resolve, reject){
        if(value == "" || value === undefined) return reject('Project ID is required');

        ProjectService.doesProjectExist(value).then(function(exists){
            if(exists){
                resolve();
            }else{
                reject("Project ID does not exist");
            }
        });
    });
}

var constraints = {

    message: {
        presence: {
            message: "Message is required"
        }
    },

    project_id: {
        doesProjectExist: true
    },

    language: {
        presence: {
            message: "Language is required"
        }
    },

    environment: {
        presence: {
            message: "Environment is required"
        }
    },

    //
    // language: {
    //     type: 'string',
    //     required: false
    // },
    //
    // environment: {
    //     type: 'string',
    //     required: false
    //     // TODO: Check if it's in the array
    // },
    //
    // stack: {
    //     // TODO: Ensure the array contains valid objects.
    //     required: false,
    //     type: 'array'
    // }

};

module.exports = function(data){
    return validate.async(data, constraints);
};