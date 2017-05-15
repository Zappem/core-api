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

        this.date_created = {
            type: Date,
            default: Date.now
        };

        this.last_occurrence = {
            type: Date,
            default: null
        };

        this.last_new_error = {
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