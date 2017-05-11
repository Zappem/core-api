var Document = require('camo').Document;
var EmbeddedDocument = require('camo').EmbeddedDocument;

class Project extends Document {
    constructor() {
        super();

        this.name = {
            type: String,
            unique: true,
            required: true
        };

        this.team = [Team];

        this.dateCreated = {
            type: Date,
            default: Date.now
        };

        this.lastOccurence = {
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

class Team extends EmbeddedDocument {
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
            required: true,
            unique: true,
            // TODO: regex validation here.
        };

        this.team_since = {
            type: Date,
            default: Date.now
        };

        this.member_since = {
            type: Date
        };
    }
}

module.exports = Project;