class TheWorld {
    constructor() {
        this.flagCount,
            this.element,
            this.flagString,
            this.flagColors
            this.classList
    }

    initialize() {
        this.element = document.getElementById("flags-in-the-world"); //formerly blank shelf
        this.flagString = "&ensp;[&ensp;]&ensp;";
        this.flagColors = ["white-flag", "black-flag", "red-flag", "orange-flag", "yellow-flag", "green-flag", "blue-flag", "indigo-flag", "violet-flag"];
        this.classList = "ascii-art icon active"
    }

    addFlag() {
        let flagWorldStatusElement = document.getElementById("flags-world-status"); 
        flagWorldStatusElement.innerHTML = "Yes, the beauty that is a flag is meant to be shared with the world."
        this.flagCount++;
        let newFlag = document.createElement("pre");
        
        newFlag.ariaLabel = "A flag";
        //newFlag.classList = this.classList + " " + this.flagColors[Math.floor(Math.random()*this.flagColors.length)]; //Use this later. Just on for fun while working!
        newFlag.classList = this.classList + " " + this.flagColors[0];
        newFlag.innerHTML = this.flagString;
        this.element.append(newFlag);
    }

    removeFlag(){

    }
}