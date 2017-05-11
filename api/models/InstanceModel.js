var Document = require('camo').Document;
//var EmbeddedDocument = require('camo').EmbeddedDocument;

class Instance extends Document {
    constructor() {
        super();

        this.error_id = String;
        this.requestUrl = String;
        this.requestMethod = String;
        this.requestHeaders = Object;
        this.requestIP = String;

        this.occurred = {
            type: Date,
            default: Date.now
        };
    }
}

module.exports = Instance;