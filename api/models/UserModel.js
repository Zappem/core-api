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