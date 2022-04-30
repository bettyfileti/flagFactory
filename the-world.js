class TheWorld {
    constructor() {
        this.flagCount,
            this.element,
            this.flagString
    }

    initialize() {
        this.element = document.getElementById("flags-in-the-world"); //formerly blank shelf
        this.flagString = "&ensp;[&ensp;]&ensp;";
    }

    addFlag() {
        let flagWorldStatusElement = document.getElementById("flags-world-status"); 
        flagWorldStatusElement.innerHTML = "Yes, the beauty that is a flag is meant to be shared with the world."
        this.flagCount++;
        let newFlag = document.createElement("pre");
        newFlag.ariaLabel = "A flag";
        newFlag.classList = "ascii-art icon active";
        newFlag.innerHTML = this.flagString;
        this.element.append(newFlag);
    }

    removeFlag(){

    }
}