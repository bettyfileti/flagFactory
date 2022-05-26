let runningIntroSequence = true;

function checkConditions(){
    if (runningIntroSequence){
        runIntroSequence();
    }
}

//--------------------------------------------------------------
// SEQUENCES
//--------------------------------------------------------------

function runIntroSequence(){
    if (!factory.sellingFlags){
        makingFlagsIntro();
    } else {
        sellingFlagsIntro();
    }
}

function makingFlagsIntro() {
        if (factory.flagsMade === 5) {
            addingNarration(new Narration("flagFactory", "Hey."));
        } else if (factory.flagsMade === 7) {
            addingNarration(new Narration("flagFactory", "You are like, really good at making these."));
        } else if (factory.flagsMade === 9) {
            addingNarration(new Narration("flagFactory", "But, it'd be nice to see them out of this warehouse."));
        } else if (factory.flagsMade === 11) {
            addingNarration(new Narration("flagFactory", "and, to like, make some money?"));
        } else if (factory.flagsMade === 13) {
            addingNarration(new Narration("flagFactory", "Try selling one."));
            buttons.find(x => x.id === 'sell-a-flag').makeVisible(true);
            stats.find(x => x.id === 'flags-sold-per-click').makeVisible(true);
            factory.sellingFlags = true;
        }
}

function sellingFlagsIntro(){
    console.log("here");
    if (factory.flagsSold === 5){
        addingNarration(new Narration("flagFactory", "Making flags, making money. Making flags, making money."));
    } else if (factory.flagsSold === 8) {
        addingNarration(new Narration("flagFactory", "Time to automate this selling."));
        buttons.find(x => x.id === 'buy-an-ask-machine').makeVisible(true);
        stats.find(x => x.id === 'ask-machine-per-sec').makeVisible(true);
        factory.askMachineAvailable = true;
    } else if (factory.askMachineOn) {
        //Another criteria here for timing? $ perhaps?
        addingNarration(new Narration("flagFactory", "Time to automate the making."));
        buttons.find(x => x.id === 'buy-a-flag-machine').makeVisible(true);
        stats.find(x => x.id === 'flag-machine-per-sec').makeVisible(true);
        factory.flagMachineAvailable = true;
    } 
}

//--------------------------------------------------------------
// OLD AND CAN PROBABLY TRASH
//--------------------------------------------------------------

// function sellingFlagsIntro() {
    // console.log("here");

    // if (factory.flagsSold >= 4 && factory.flagsSold < 8) {
    //     addingNarration(new Narration("flagFactory", "Sell, baby, sell."));
    // } else if (factory.flagsSold >= 8 && factory.flagsSold < 13) {
    //     addingNarration(new Narration("flagFactory", "I have a thought. What about..."));
    // } else if (factory.flagsSold >= 13 && factory.flagsSold < 15) {
    //     addingNarration(new Narration("flagFactory", "a selling machine? like an Automated-Shop-Keeper?"));
    // } else if (factory.flagsSold >= 15 && factory.flagsSold < 20) {
    //     addingNarration(new Narration("flagFactory", "Yes, an Automated-Shop-Keeper. Do you have enough money for one?"));
    //     factory.makeASKMachineAvailable();
    // }
//}

    //  else if (factory.flagMachineOn) {
    //         let flagMachineRunTime = factory.flagsMade - factory.flagMachineStartTime;
    //         if (flagMachineRunTime === 5) {
    //             addingNarration(new Narration("flagFactory", "Yes. So much better."));
    //         }
    //         if (flagMachineRunTime === 15) {
    //             addingNarration(new Narration("flagFactory", "Um...Did you notice our funds are getting a little low"));
    //         }
    //         if (flagMachineRunTime === 20) {
    //             addingNarration(new Narration("flagFactory", "Seriously. We're running out of cash...and space in the warehouse."));
    //         }
    //         if (flagMachineRunTime === 25) {
    //             addingNarration(new Narration("flagFactory", "Maybe we can sell some of these flags?"));
    //             buttons.find(x => x.id === 'buy-a-flag-machine').updateLabel();
    //             buttons.find(x => x.id === 'buy-a-flag-machine').makeVisible(true);
    //             factory.makeFlagMachineAvailable();
    //         }
    //     }