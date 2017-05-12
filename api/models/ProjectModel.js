var Document = require('camo').Document;
var EmbeddedDocument = require('camo').EmbeddedDocument;
var EmbeddedUser = require('./EmbeddedUser.js');

class Project extends Document {
    constructor() {
        super();

        this.name = {
            type: String,
            unique: true,
            required: true
        };

        this.team = [EmbeddedUser];

        this.dateCreated = {
            type: Date,
            default: Date.now
        };

        this.lastOccurrence = {
            type: Date,
            default: null
        };

        this.lastNewError = {
            type: Date,
            default: null
        };
    };

    addTeamMember() {

    }
}

module.exports = Project;