let flagsInWarehouse = 0;
let flagsMade = 0;
let flagsSold = 0;
let availableFunds = 4.00;

let flagPrice = .10;
let flagCostToMake = .05;
let flagMachineCostToMake = 2.5;
let askMachineCostToMake = 5;
let flagsPerClick = 1;
let flagMachineRate = 1; //flags made per second
let flagsSoldPerClick = 1;
let askMachineRate = 1; //flags sold per second

let flagsMadeDisplay = document.getElementById("flags-made-count");
let availableFundsDisplay = document.getElementById("money-count");
availableFundsDisplay.innerHTML = convertToMoney(availableFunds);


//--------------------------------------------------------------

let narrations = [];
let buttons = [];
let stats = [];

buttons.push(new Button("make-a-flag", makeAFlag, "Make a Flag", "flagFactory"));
buttons.push(new Button("make-a-flag-machine", makeAFlagMachine, "Make a Flag Machine","flagFactory"));
buttons.push(new Button("sell-a-flag", sellAFlag, "Sell a Flag", "flagFactory"));
buttons.push(new Button("make-an-ask-machine", makeAskMachine, "Make an ASK Machine", "flagFactory"));

for (button of buttons){
    button.initialize();
    button.updateLabel();
}

buttons.find(x => x.id === 'make-a-flag').activate(true);

stats.push(new Stat("flags-in-warehouse", "flags-warehouse-count"));
stats.push(new Stat("flags-made-per-click", "flags-made-rate"));
stats.push(new Stat("flag-machine-per-sec", "flag-machine-rate"));
stats.push(new Stat("flags-sold-per-click", "flags-sold-rate"));
stats.push(new Stat("ask-machine-per-sec", "ask-machine-rate"));

for (stat of stats){
    stat.initialize();
}

let flagMachineOn = false;
let sellingFlags = false;
let askMachineOn = false;
let flagMachineStartTime;

let warehouseIsEmpty = true;
let flagString = "&ensp;[&ensp;]&ensp;";
let flagWarehouse = document.getElementById("flag-warehouse");
let emptyShelf = document.getElementById("warehouse-shelf-blank");
//let flagsInWarehouseDisplay = emptyShelf.getElementsByClassName("flag-count")[0];
let warehouseInstructions = document.getElementById("warehouse-instructions");

//--------------------------------------------------------------

function moneyIsChanged(makingMoney, howMuch) {

    //makingMoney true means adding money. False means losing money.
    if (makingMoney) {
        availableFunds = availableFunds + howMuch;
    } else {
        availableFunds = availableFunds - howMuch;
    }

    //out of money, sell a flag
    let outOfMoneyText = "Time to sell a flag or two. Make some money.";

    if (availableFunds <= 0) {
        availableFunds = 0;
        if (narrations[narrations.length-1].text != outOfMoneyText){
            addingNarration(new Narration("flagFactory", outOfMoneyText)); 
        }
        buttons.find(x => x.id === 'sell-a-flag').activate(true);
        buttons.find(x => x.id === "make-a-flag").activate(false);
    } else if (availableFunds <= flagMachineCostToMake){
        if (narrations[narrations.length-1].text != outOfMoneyText){
            addingNarration(new Narration("flagFactory", outOfMoneyText)); 
        }
        buttons.find(x => x.id === 'sell-a-flag').activate(true);
        buttons.find(x => x.id === "make-a-flag-machine").activate(false);
    }

    if (availableFunds > flagCostToMake){
        buttons.find(x => x.id === "make-a-flag").activate(true);
    }

    availableFundsDisplay.innerHTML = convertToMoney(availableFunds);

}

function warehouseIsChanged(addingFlag) {
    //addingFlag true means a flag made. False means a flag sold.

    if (addingFlag) {
        flagsInWarehouse += 1;
        putFlagInWarehouse();
    } else if (!addingFlag) {
        flagsInWarehouse -= 1;
        removeFlagFromWarehouse();
    }

    //If warehouse has flags
    if (flagsInWarehouse >= 1) {
        warehouseIsEmpty = false;
        buttons.find(x => x.id === 'sell-a-flag').activate(false);
    }

    // //If warehouse is empty
    if (flagsInWarehouse <= 0) {
        warehouseIsEmpty = true;
        flagSelling = false; //HERE
        document.getElementById("warehouse-status").classList = "active";
        buttons.find(x => x.id === 'sell-a-flag').activate(false);
    }

    //Intro flow
    if (!sellingFlags) {
        makingFlagsIntro();
    } else {
        sellingFlagsIntro();
    }
}

function putFlagInWarehouse() {
    document.getElementById("flags-warehouse-count").innerHTML = flagsInWarehouse;

    if (askMachineOn) {
        // let flagIcons = document.getElementsByClassName("ascii-art icon");
        // for (let i = 0; i < flagIcons.length; i++) {
        //     flagIcons[i].remove();
        // }
    } else {
        // let newFlag = document.createElement("pre");
        // newFlag.ariaLabel = "A flag";
        // newFlag.className = "ascii-art icon";
        // newFlag.innerHTML = flagString;
        // flagWarehouse.append(newFlag);
    }
}

function removeFlagFromWarehouse() {
    let newFlag = document.createElement("pre");
    newFlag.ariaLabel = "A flag";
    newFlag.className = "ascii-art icon";
    newFlag.innerHTML = flagString;
    //flagWarehouse.append(newFlag);

    if (askMachineOn) {
        flagsInWarehouseDisplay.innerHTML = flagsInWarehouse;
    } else {
        //flagWarehouse.removeChild(flagWarehouse.lastChild);
    }
}

function buildWarehouseShelves() {
    //turn on the the display for the shelf div
    emptyShelf.style.display = "inline";
    warehouseInstructions.classList = "active";

    //clear out visual of flags in warehouse
    let flagIcons = document.getElementsByClassName("ascii-art icon");
    for (let i = 0; i < flagIcons.length; i++) {
        flagIcons[i].remove();
    }
}

//--------------------------------------------------------------
// SEQUENCES
//--------------------------------------------------------------

function makingFlagsIntro() {
    if (flagsMade == 5) {
        let thisNarration = new Narration("flagFactory", "You are really good at making these.");
        addingNarration(thisNarration);        
    } else if (flagsMade == 7) {
        let thisNarration = new Narration("flagFactory", "But, I'm thinking...");
        addingNarration(thisNarration);  
    } else if (flagsMade == 9) {
        let thisNarration = new Narration("flagFactory", "It would be nice to automate this.");
        addingNarration(thisNarration); 
    } else if (flagsMade == 13) {
        addingNarration(new Narration("flagFactory", "I know. Let's try a machine.")); 
        buttons.find(x => x.id === 'make-a-flag-machine').updateLabel();
        buttons.find(x => x.id === 'make-a-flag-machine').activate(true);
    } else if (flagMachineOn) {
        let flagMachineRunTime = flagsMade - flagMachineStartTime;
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
            sellingFlags = true;
        }
    }
}

function sellingFlagsIntro() {
    if (flagsSold == 4) {
        addingNarration(new Narration("flagFactory", "Sell, baby, sell.")); 
    } else if (flagsSold == 8) {
        addingNarration(new Narration("flagFactory", "I have a thought. What about...")); 
    } else if (flagsSold == 13) {
        addingNarration(new Narration("flagFactory", "a selling machine? like an Automated-Shop-Keeper?")); 
    } else if (flagsSold == 15) {
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
    console.log("flagsSold: ", flagsSold);
    console.log("flagsMade: ", flagsMade);
    console.log("flagsInWarehouse: ", flagsInWarehouse);
    console.log("flagMachineOn: ", flagMachineOn);
    console.log("askMachineOn: ", askMachineOn);
    console.log("warehouseIsEmpty: ", warehouseIsEmpty);
    console.log("//------")
}
