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

        this.profile_img = {
            type: String,
            default: null
        };
    }
}

module.exports = EmbeddedUser;