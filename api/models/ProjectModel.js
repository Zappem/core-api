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

    addTeamMember(user) {
        var member = EmbeddedUser.create();
        member.user_id = user._id;
        member.first_name = user.first_name;
        member.last_name = user.last_name;
        //member.profile_img = user.profile_img;
        return this.team.push(member);
    }
}

module.exports = Project;