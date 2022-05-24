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
buttons.push(new Button("buy-a-flag-machine", factory.buyAFlagMachine, "Buy a Making Machine", "flagFactory"));
buttons.push(new Button("sell-a-flag", factory.sellAFlag, "Sell a Flag", "flagFactory"));
buttons.push(new Button("buy-an-ask-machine", factory.buyAskMachine, "Buy a Selling Machine", "flagFactory"));


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

//Run the factory every second, if needed?
// setInterval(function () {
//     //this code runs every second 
//     factory.runFactory();
// }, 1000);


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
