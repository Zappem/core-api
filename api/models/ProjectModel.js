var Document = require('camo').Document;
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

    addTeamMember(user) {
        return this.team.push(
            EmbeddedUser.createFromRealUser(user)
        );
    }
}

module.exports = Project;