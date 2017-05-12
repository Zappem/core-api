var Document = require('camo').Document;
var EmbeddedProject = require('./EmbeddedProject.js');
var EmbeddedStack = require('./EmbeddedStack.js');
var EmbeddedUser = require('./EmbeddedUser.js');

class Exception extends Document {
    constructor() {
        super();

        this.message = {
            type: String,
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

        this.stack = [EmbeddedStack];

        this.assigned_to = {
            type: EmbeddedUser,
            required: false,
            default: null
        };

        this.project = {
            type: EmbeddedProject,
            required: true
        };

        this.language = {
            type: String,
            required: true
        };

        this.environment = {
            type: String,
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

    addAssignee(user) {
        this.assigned_to = EmbeddedUser.createFromRealUser(user);
        return this;
    }

    removeAssignee() {
        this.assigned_to = null;
        return this;
    }

}

module.exports = Exception;