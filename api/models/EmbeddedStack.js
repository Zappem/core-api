var EmbeddedDocument = require('camo').EmbeddedDocument;

class EmbeddedStack extends EmbeddedDocument {
    constructor() {
        super();

        this.file = {
            type: String,
            required: true
        };

        this.line = {
            type: Number,
            default: 0
        };

        this.class = {
            type: String,
            default: "<Unknown>"
        };
    }
}

module.exports = EmbeddedStack;