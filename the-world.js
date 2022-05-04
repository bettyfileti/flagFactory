class TheWorld {
    constructor() {
        this.flagCount = 0,
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
        this.flagStrings =[
            this.flagString,
            "&ensp;[TRUMP]&ensp;",
            "&ensp;[BIDEN]&ensp;",
            "&ensp;[TRUMP WON]&ensp;",
            "&ensp;[BIDEN WON]&ensp;",
            "&ensp;[TRUMP WON, GET OVER IT]&ensp;",
            "&ensp;[BIDEN WON, GET OVER IT]&ensp;",
            "&ensp;[FUCK BIDEN]&ensp;",
            "&ensp;[FUCK TRUMP]&ensp;",
            "&ensp;[FUCK BIDEN AND FUCK YOU FOR VOTING FOR HIM]&ensp;",
            "&ensp;[FUCK TRUMP AND FUCK YOU FOR VOTING FOR HIM]&ensp;"
        ]
    }

    addFlag() {
        let flagWorldStatusElement = document.getElementById("flags-world-status");
        flagWorldStatusElement.innerHTML = "Yes, the beauty that is a flag is meant to be shared with the world."
        this.flagCount++;
        let newFlag = document.createElement("pre");

        newFlag.ariaLabel = "A flag";

        let flagFactor = 200;
        newFlag.classList = this.classList + " " + this.flagColors[0];

        //To get colors
        let max = Math.ceil(this.flagCount / flagFactor);
        let maxReference = this.flagCount % max;
        newFlag.classList = this.classList + " " + this.flagColors[maxReference];
        //----

        // console.log("this.flagCount:", this.flagCount, " | max:", max, " | flagCount % max:", this.flagCount % max);

        newFlag.innerHTML = this.flagStrings[0];
        this.element.append(newFlag);

    }

    removeFlag() {

    }
}