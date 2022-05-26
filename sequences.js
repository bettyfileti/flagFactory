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
    if (factory.flagsSold === 5){
        addingNarration(new Narration("flagFactory", "Making flags, making money. Making flags, making money."));
    } else if (factory.flagsSold === 8) {
        addingNarration(new Narration("flagFactory", "Time to automate this selling."));
        buttons.find(x => x.id === 'buy-an-ask-machine').makeVisible(true);
        stats.find(x => x.id === 'ask-machine-per-sec').makeVisible(true);
        factory.askMachineAvailable = true;
    } else if (factory.askMachineOn) {
        //Another criteria here for timing? $ perhaps?
        // addingNarration(new Narration("flagFactory", "Time to automate the making."));
        // buttons.find(x => x.id === 'buy-a-flag-machine').makeVisible(true);
        // stats.find(x => x.id === 'flag-machine-per-sec').makeVisible(true);
        // factory.flagMachineAvailable = true;
    } 
}
