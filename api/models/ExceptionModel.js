var Document = require('camo').Document;
var EmbeddedDocument = require('camo').EmbeddedDocument;

class Exception extends Document {
    constructor() {
        super();

        this.message = {
            type: String,
            unique: true,
            required: true
        };

        this.fullMessage = {
            type: String,
            required: true
        };

        this.times = {
            type: Number,
            default: 1
        };

        this.stack = [Stack];

        this.project = {
            type: Project,
            required: true
        };

        this.firstSeen = {
            type: Date,
            default: Date.now
        };

        this.lastSeen = {
            type: Date,
            default: Date.now
        };

    }
}

class Stack extends EmbeddedDocument {
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

class Project extends EmbeddedDocument {
    constructor() {
        super();
        this.project_id = String;
        this.name = String;
    }
}
module.exports = Exception;