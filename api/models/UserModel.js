var Document = require('camo').Document;
var EmbeddedDocument = require('camo').EmbeddedDocument;
var EmbeddedProject = require('./EmbeddedProject.js');

class User extends Document {
    constructor() {
        super();

        this.first_name = {
            type: String,
            required: true
        };

        this.last_name = {
            type: String,
            required: true
        };

        this.email = {
            type: String,
            required: true
        };

        this.password = {
            type: String,
            required: true
        };

        this.member_since = {
            type: Date,
            default: Date.now
        };

        this.projects = [EmbeddedProject];

        this.assigned_exceptions = [EmbeddedException];
    }

    addAssignedException(exception_id) {
        var exception = EmbeddedException.create();
        exception.exception_id = exception_id;
        this.assigned_exceptions.push(exception);
        return this;
    }

    removeAssignedException(exception_id) {
        var count = 0,
            found = false;
        this.assigned_exceptions.forEach(function(exception){
            if(exception.exception_id === exception_id){
                found = true;
                return;
            }
            count++;
        });

        if(found) this.assigned_exceptions.splice(count);
        return this;
    };

}

class EmbeddedException extends EmbeddedDocument {
    constructor() {
        super();

        this.exception_id = {
            type: String,
            required: true
        };

    }
}

module.exports = User;