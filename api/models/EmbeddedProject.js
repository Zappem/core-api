var EmbeddedDocument = require('camo').EmbeddedDocument;

class EmbeddedProject extends EmbeddedDocument {
    constructor() {
        super();
        this.project_id = String;
        this.name = String;
    }
}

module.exports = EmbeddedProject;