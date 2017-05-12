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
    };

    /**
     * Creates a new instance of the EmbeddedUser using data from a user model.
     * @param user
     */
    static createFromRealUser(realUser) {
        var user = this.create();
        user.user_id = realUser._id;
        user.first_name = realUser.first_name;
        user.last_name = realUser.last_name;
        //user.profile_img = realUser.profile_img
        return user;
    }

};

module.exports = EmbeddedUser;