let projects = []; //recurring projects
let activeProjects = [];

class Project {
    constructor(id, trigger, _checkForTrigger, _runProject) {
        this.id = id,
            this.uses = 1,
            this.isActive = false,
            this.isAvailable = false,
            this.isOver,
            this.checkForTrigger = _checkForTrigger,
            this.runProject = _runProject
    }

    //checkForTrigger needs to always be a function that returns true to start the project
}

//--------------------------------------------------------------
// Project Manager
//--------------------------------------------------------------  

function manageProjects() {

}

