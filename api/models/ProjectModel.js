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

    removeTeamMember(user_id) {
        var count = 0,
            found = false;
        this.team.forEach(function(user){
            if(user.user_id === user_id){
                found = true;
                return;
            }
            count++;
        });

        if(found) this.team.splice(count);
        return this;
    }

}

module.exports = Project;