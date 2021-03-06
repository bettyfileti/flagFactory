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
buttons.push(new Button("sell-a-flag", factory.sellAFlag, "Sell a Flag", "flagFactory"));
buttons.push(new Button("buy-an-selling-machine", factory.buysellingMachine, "Buy a Selling Machine", "flagFactory"));
buttons.push(new Button("buy-a-making-machine", factory.buyAmakingMachine, "Buy a Making Machine", "flagFactory"));



for (button of buttons) {
    button.initialize();
    button.updateLabel();
}

buttons.find(x => x.id === 'make-a-flag').makeVisible(true);

// stats.push(new Stat("flags-in-warehouse", "flags-warehouse-count"));
stats.push(new Stat("flags-made-per-click", "flags-made-rate"));
stats.push(new Stat("flags-sold-per-click", "flags-sold-rate"));
stats.push(new Stat("selling-machine-per-sec", "selling-machine-rate"));
stats.push(new Stat("making-machine-per-sec", "making-machine-rate"));

for (stat of stats) {
    stat.initialize();
}

document.body.addEventListener("click", checkConditions); //in sequences.js


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
