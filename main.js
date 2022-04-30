let narrations = [];
let buttons = [];
let stats = [];


//--------------------------------------------------------------

let warehouse = new Warehouse();
warehouse.initialize();

let money = new Money();
money.initialize();

let factory = new Factory();
factory.initialize();

buttons.push(new Button("make-a-flag", factory.makeAFlag, "Make a Flag", "flagFactory"));
buttons.push(new Button("make-a-flag-machine", factory.makeAFlagMachine, "Make a Flag Machine","flagFactory"));
buttons.push(new Button("sell-a-flag", factory.sellAFlag, "Sell a Flag", "flagFactory"));
buttons.push(new Button("make-an-ask-machine", factory.makeAskMachine, "Make an ASK Machine", "flagFactory"));


for (button of buttons){
    button.initialize();
    button.updateLabel();
}

buttons.find(x => x.id === 'make-a-flag').activate(true);

// stats.push(new Stat("flags-in-warehouse", "flags-warehouse-count"));
stats.push(new Stat("flags-made-per-click", "flags-made-rate"));
stats.push(new Stat("flag-machine-per-sec", "flag-machine-rate"));
stats.push(new Stat("flags-sold-per-click", "flags-sold-rate"));
stats.push(new Stat("ask-machine-per-sec", "ask-machine-rate"));

for (stat of stats){
    stat.initialize();
}

let flagString = "&ensp;[&ensp;]&ensp;";
let emptyShelf = document.getElementById("warehouse-shelf-blank");
//let flagsInWarehouseElement = emptyShelf.getElementsByClassName("flag-count")[0];
// let warehouseInstructions = document.getElementById("warehouse-instructions");

//--------------------------------------------------------------


//--------------------------------------------------------------


// function putFlagInWarehouse() {
//     // document.getElementById("flags-warehouse-count").innerHTML = flagsInWarehouse;

//     if (askMachineOn) {
//         // let flagIcons = document.getElementsByClassName("ascii-art icon");
//         // for (let i = 0; i < flagIcons.length; i++) {
//         //     flagIcons[i].remove();
//         // }
//     } else {
//         // let newFlag = document.createElement("pre");
//         // newFlag.ariaLabel = "A flag";
//         // newFlag.className = "ascii-art icon";
//         // newFlag.innerHTML = flagString;
//         // flagWarehouse.append(newFlag);
//     }
// }

// function removeFlagFromWarehouse() {
//     let newFlag = document.createElement("pre");
//     newFlag.ariaLabel = "A flag";
//     newFlag.className = "ascii-art icon";
//     newFlag.innerHTML = flagString;
//     //flagWarehouse.append(newFlag);

//     if (askMachineOn) {
//         flagsInWarehouseElement.innerHTML = flagsInWarehouse;
//     } else {
//         //flagWarehouse.removeChild(flagWarehouse.lastChild);
//     }
// }

// function buildWarehouseShelves() {
//     //turn on the the display for the shelf div
//     emptyShelf.style.display = "inline";
//     warehouseInstructions.classList = "active";

//     //clear out visual of flags in warehouse
//     let flagIcons = document.getElementsByClassName("ascii-art icon");
//     for (let i = 0; i < flagIcons.length; i++) {
//         flagIcons[i].remove();
//     }
// }

//--------------------------------------------------------------
// SEQUENCES
//--------------------------------------------------------------

function makingFlagsIntro() {
    //There is not event trigger for the factory.
    if (factory.flagsMade === 5) {
        addingNarration(new Narration("flagFactory", "Hey."));        
    } else if (factory.flagsMade === 7) {
        addingNarration(new Narration("flagFactory", "You are like, really good at making these."));  
    } else if (factory.flagsMade === 9) {
        addingNarration(new Narration("flagFactory", "But...it would be nice to automate this.")); 
    } else if (factory.flagsMade === 13) {
        addingNarration(new Narration("flagFactory", "I know. Let's try a machine.")); 
        buttons.find(x => x.id === 'make-a-flag-machine').updateLabel();
        buttons.find(x => x.id === 'make-a-flag-machine').activate(true);
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
            buttons.find(x => x.id === 'sell-a-flag').activate(true);
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
        document.getElementById("make-an-ask-machine").classList = "active"
    }
}

//--------------------------------------------------------------

function addingNarration(thisNarration){
    for (let narration of narrations){
        narration.archive();
    }
    narrations.push(thisNarration);
    thisNarration.initialize();
}

//--------------------------------------------------------------

function convertToMoney(val) {
    return (Math.floor(val * 100).toFixed(0) / 100).toFixed(2);
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
