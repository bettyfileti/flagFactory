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
        addingNarration(new Narration("flagFactory", "OK. Time to automate this selling nonsense."));
        buttons.find(x => x.id === 'buy-an-selling-machine').makeVisible(true);
        stats.find(x => x.id === 'selling-machine-per-sec').makeVisible(true);
        factory.sellingMachineAvailable = true;
    } else if (factory.sellingMachinesBought == 1){
        addingNarration(new Narration("flagFactory", "Making could use an upgrade."));
        flagsPerClick++;
        buttons.find(x => x.id === 'make-a-flag').updateLabel();
        stats.find(x => x.id === 'flags-made-per-click').update();
    } else if ((factory.sellingMachinesBought == 2) && (flagsPerClick === 1)) {
        addingNarration(new Narration("flagFactory", "Making, making, making. Some things machines do better."));
        buttons.find(x => x.id === 'buy-a-making-machine').makeVisible(true);
        stats.find(x => x.id === 'making-machine-per-sec').makeVisible(true);
        factory.makingMachineAvailable = true;

        // addingNarration(new Narration("flagFactory", "Making could use an upgrade."));
        // flagsPerClick++;
        // buttons.find(x => x.id === 'make-a-flag').updateLabel();
        // stats.find(x => x.id === 'flags-made-per-click').update();
    } 
}
