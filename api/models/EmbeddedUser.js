var EmbeddedDocument = require('camo').EmbeddedDocument;

class EmbeddedUser extends EmbeddedDocument {
    constructor() {
        super();

        this.user_id = {
            type: String,
            required: true
        };

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
            unique: true
            // TODO: regex validation here.
        };

        this.profile_img = {
            type: String,
            default: null
        };
    }
}

module.exports = EmbeddedUser;