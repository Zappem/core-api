var EmbeddedDocument = require('camo').EmbeddedDocument;

class EmbeddedProject extends EmbeddedDocument {
    constructor() {
        super();
        this.project_id = String;
        this.name = String;
    }

    static createFromRealProject(proj) {
        var project = this.create();
        project.project_id = proj._id;
        project.name = proj.name;
        return project;
    }
}

module.exports = EmbeddedProject;