var validate = require('validate');

module.exports = validate({

    message: {
        type: 'string',
        required: true,
        message: 'Message is required'
    },

    project_id: {
        type: 'string',
        required: true,
        message: 'Project ID is required',
        use: function() {
            // TODO: Check if it's a valid project and if the user has access to it.
            return true;
        }
    },

    language: {
        type: 'string',
        required: false
    },

    environment: {
        type: 'string',
        required: false
        // TODO: Check if it's in the array
    },

    stack: {
        // TODO: Ensure the array contains valid objects.
        required: false,
        type: 'array'
    }

});