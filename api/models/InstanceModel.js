var Document = require('camo').Document;

class Instance extends Document {
    constructor() {
        super();

        this.error_id = String;
        this.request_url = String;
        this.request_method = String;
        this.request_headers = Object;
        this.request_ip = String;

        this.occurred = {
            type: Date,
            default: Date.now
        };
    }
}

module.exports = Instance;