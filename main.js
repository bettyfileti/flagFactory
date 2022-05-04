//--------------------------------------------------------------
// INITIALIZE
//--------------------------------------------------------------

let narrations = [];
let buttons = [];
let stats = [];

let warehouse = new Warehouse();
warehouse.initialize();

let money = new Money();
money.initialize();

let factory = new Factory();
factory.initialize();

let theWorld = new TheWorld();
theWorld.initialize();

buttons.push(new Button("make-a-flag", factory.makeAFlag, "Make a Flag", "flagFactory"));
buttons.push(new Button("buy-a-flag-machine", factory.buyAFlagMachine, "Buy a Flag Machine", "flagFactory"));
buttons.push(new Button("sell-a-flag", factory.sellAFlag, "Sell a Flag", "flagFactory"));
buttons.push(new Button("buy-an-ask-machine", factory.buyAskMachine, "Buy an ASK Machine", "flagFactory"));


for (button of buttons) {
    button.initialize();
    button.updateLabel();
}

buttons.find(x => x.id === 'make-a-flag').makeVisible(true);

// stats.push(new Stat("flags-in-warehouse", "flags-warehouse-count"));
stats.push(new Stat("flags-made-per-click", "flags-made-rate"));
stats.push(new Stat("flag-machine-per-sec", "flag-machine-rate"));
stats.push(new Stat("flags-sold-per-click", "flags-sold-rate"));
stats.push(new Stat("ask-machine-per-sec", "ask-machine-rate"));

for (stat of stats) {
    stat.initialize();
}

//--------------------------------------------------------------
// SEQUENCES
//--------------------------------------------------------------

function makingFlagsIntro() {
    if (factory.flagsMade === 5) {
        addingNarration(new Narration("flagFactory", "Hey."));
    } else if (factory.flagsMade === 7) {
        addingNarration(new Narration("flagFactory", "You are like, really good at making these."));
    } else if (factory.flagsMade === 9) {
        addingNarration(new Narration("flagFactory", "But...it would be nice to automate this."));
    } else if (factory.flagsMade === 13) {
        addingNarration(new Narration("flagFactory", "I know. Let's try a machine."));
        buttons.find(x => x.id === 'buy-a-flag-machine').updateLabel();
        buttons.find(x => x.id === 'buy-a-flag-machine').makeVisible(true);
        factory.makeFlagMachineAvailable();
    } else if (factory.flagMachineOn) {
        let flagMachineRunTime = factory.flagsMade - factory.flagMachineStartTime;
        if (flagMachineRunTime === 5) {
            addingNarration(new Narration("flagFactory", "Yes. So much better."));
        }
        if (flagMachineRunTime === 15) {
            addingNarration(new Narration("flagFactory", "Um...Did you notice our funds are getting a little low"));
        }
        if (flagMachineRunTime === 20) {
            addingNarration(new Narration("flagFactory", "Seriously. We're running out of cash...and space in the warehouse."));
        }
        if (flagMachineRunTime === 25) {
            addingNarration(new Narration("flagFactory", "Maybe we can sell some of these flags?"));
            buttons.find(x => x.id === 'sell-a-flag').makeVisible(true);
            factory.sellingFlags = true;
        }
    }
}

function sellingFlagsIntro() {
    if (factory.flagsSold === 4) {
        addingNarration(new Narration("flagFactory", "Sell, baby, sell."));
    } else if (factory.flagsSold === 8) {
        addingNarration(new Narration("flagFactory", "I have a thought. What about..."));
    } else if (factory.flagsSold === 13) {
        addingNarration(new Narration("flagFactory", "a selling machine? like an Automated-Shop-Keeper?"));
    } else if (factory.flagsSold === 15) {
        addingNarration(new Narration("flagFactory", "Yes, an Automated-Shop-Keeper."));
        factory.askMachineAvailable = true;
        document.getElementById("buy-an-ask-machine").classList = "active"
    }
}

//--------------------------------------------------------------
// HELPER FUNCTIONS
//--------------------------------------------------------------

function addingNarration(thisNarration) {
    for (let narration of narrations) {
        narration.archive();
    }
    narrations.push(thisNarration);
    thisNarration.initialize();
}


function convertToMoney(val) {
    return (Math.floor(val * 100).toFixed(0) / 100).toFixed(2);
}

function random(items) {
    return items[Math.floor(Math.random() * items.length)];
}

//--------------------------------------------------------------
// DEVELOPER BUTTON
//--------------------------------------------------------------

document.getElementById("give-me-info").addEventListener("click", giveMeInfo);
function giveMeInfo() {
    console.log("//------")
    console.log(factory);
    console.log(warehouse);
    console.log(money);
    console.log("//------")
}
