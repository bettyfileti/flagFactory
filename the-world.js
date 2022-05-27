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
            "&ensp;[FUCK TRUMP AND FUCK YOU FOR VOTING FOR HIM]&ensp;",
            "&ensp;[THIS IS HOW I ROLL with a Steam Engine]&ensp;",
            "&ensp;[USS Coral Sea CVA-43]&ensp;",
            "&ensp;[Salon Manicure Beauty Makeup all over pattern]&ensp;",
            "&ensp;[LOVE LIFE LOVE CURE BATTEN DISEASE with light blue ribbon on pink watercolor background]&ensp;",
            "&ensp;[VETERAN NAVY. I AMERICAN-FLAG SERVED]&ensp;",
            "&ensp;[Only you can prevent Socialism. Smokey the bear wearing a MAGA hat.]&ensp;",
            "&ensp;[Geometric fox pattern with weird stripes]&ensp;",
            "&ensp;[Akatsuki character art]&ensp;",


        ]
    }

    addFlag() {
        //Rather than add them one at a time. Make a whole bunch of them and then switch class to active, so your not overediting the dom.
        let flagWorldStatusElement = document.getElementById("flags-world-status");
        if (factory.flagsSold === 1){
            flagWorldStatusElement.innerHTML = "<p>WAY TO SELL, MY FRIEND!</p> <p class = 'statsType'> " + factory.flagsSold + " beautiful flag out in the world.</p>";
        } else {
            flagWorldStatusElement.innerHTML = "<p>WAY TO SELL, MY FRIEND!</p> <p class = 'statsType'> " + factory.flagsSold + " beautiful flags out in the world.</p>";
        }
        this.flagCount++;
        let newFlag = document.createElement("pre");

        newFlag.ariaLabel = "A flag";

        let flagFactor = 200;
        newFlag.classList = this.classList + " " + this.flagColors[0];

        //To get colors
        let max = Math.ceil(this.flagCount / flagFactor);
        let maxReference = this.flagCount % max;
        //newFlag.classList = this.classList + " " + this.flagColors[maxReference];
        //----

        // console.log("this.flagCount:", this.flagCount, " | max:", max, " | flagCount % max:", this.flagCount % max);

        newFlag.innerHTML = this.flagStrings[maxReference];
        this.element.append(newFlag);

    }

    removeFlag() {

    }
}