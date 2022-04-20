let flagsInWarehouse = 0;
let flagsMade = 0;
let flagsSold = 0;
let availableFunds = 5.00;

let flagPrice = .10;
let flagCostToMake = .05;
let flagMachineCostToMake = 3;
let askMachineCostToMake = 5;

let flagsMadeDisplay = document.getElementById("flags-made-count");
let availableFundsDisplay = document.getElementById("money-count");
availableFundsDisplay.innerHTML = convertToMoney(availableFunds);

let btn_makeAFlag = document.getElementById("make-a-flag");
let btn_makeAFlagMachine = document.getElementById("make-a-flag-machine");
let btn_sellAFlag = document.getElementById("sell-a-flag");
let btn_makeAnAskMachine = document.getElementById("make-an-ask-machine");
btn_makeAnAskMachine.innerHTML = btn_makeAnAskMachine.innerHTML + " (-$" + convertToMoney(askMachineCostToMake) + ")";
btn_makeAFlagMachine.innerHTML = btn_makeAFlagMachine.innerHTML + " (-$" + convertToMoney(flagMachineCostToMake) + ")";
btn_sellAFlag.innerHTML = btn_sellAFlag.innerHTML + " (+$" + convertToMoney(flagPrice) + ")";


let nextInstruction = document.getElementsByClassName("next-instruction")[0];
let flagMachineOn = false;
let sellingFlags = false;
let askMachineOn = false;
let flagMachineStartTime;

let warehouseIsEmpty = true;
let flagString = "&ensp;[&ensp;]&ensp;";
let flagWarehouse = document.getElementById("flag-warehouse");
let emptyShelf = document.getElementById("warehouse-shelf-blank");
let flagsInWarehouseDisplay = emptyShelf.getElementsByClassName("flag-count")[0];
let warehouseInstructions = document.getElementById("warehouse-instructions");

btn_makeAFlag.addEventListener("click", makeAFlag);
btn_makeAFlagMachine.addEventListener("click", makeAFlagMachine);
btn_sellAFlag.addEventListener("click", sellAFlag);
btn_makeAnAskMachine.addEventListener("click", makeAskMachine);

//--------------------------------------------------------------

function makeAFlag() {
    if (warehouseIsEmpty && askMachineOn){
        console.log("empty warehouse + askMachineOn, but trying to make flags");
        //Come back here to fix!
        //Warehouse is empty and ASK machine is off, but flag machine is still on, so it keeps adding a flag in and then selling 2.
    } else {
        flagsMade += 1;
        flagsMadeDisplay.innerHTML = flagsMade;
        document.getElementById("flags-made-count-container").style.display = "flex";
        warehouseIsChanged(true);
        moneyIsChanged(false, flagCostToMake);
    
        if (flagsMade != flagsInWarehouse + flagsSold) {
            console.log("Something is not adding up");
            giveMeInfo();
        }
    }
}

function makeAFlagMachine() {
    console.log("Making a Flag Machine");
    moneyIsChanged(false, flagMachineCostToMake);
    flagMachineOn = true;
    flagMachineStartTime = flagsMade;
    setInterval(function () {
        makeAFlag();
    }, 1000);
    nextInstruction.innerHTML = "1 flag every second. So dope.";
    btn_makeAFlagMachine.disabled = "true";
}

function sellAFlag() {
    if (warehouseIsEmpty){
        console.log("ASK machine is off, due to lack of flags.")
        warehouseInstructions.innerHTML = "The ASK machine is off until you get more flags made."
    } else {
        if (!sellingFlags) {
            sellingFlags = true;
            document.getElementById("money-count-container").style.display = "inline";
        }
        flagsSold += 1;
        document.getElementById("flags-sold-count").innerHTML = flagsSold;
    
        warehouseIsChanged(false);
        moneyIsChanged(true, flagPrice);
    }
}

function makeAskMachine() {
    askMachineOn = true;
    moneyIsChanged(false, askMachineCostToMake);

    setInterval(function () {
        //this code runs every second 
        sellAFlag();
    }, 500);

    buildWarehouseShelves();
    nextInstruction.innerHTML = "That baby is selling 2 flags every second."
    btn_makeAnAskMachine.disabled = "true";
}

//--------------------------------------------------------------

function moneyIsChanged(makingMoney, howMuch) {
    //makingMoney true means adding money. False means losing money.
    if (makingMoney) {
        availableFunds = availableFunds + howMuch;
    } else {
        availableFunds = availableFunds - howMuch;
    }
    availableFundsDisplay.innerHTML = convertToMoney(availableFunds);

    if (availableFunds < 0) {
        document.getElementById("money-count-container").classList.add("alert");
    } else {
        document.getElementById("money-count-container").classList = "count-container active";
    }
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
        document.getElementById("warehouse-status").classList = "hidden";
        btn_sellAFlag.disabled = false;
    }

    // //If warehouse is empty
    if (flagsInWarehouse <= 0) {
        warehouseIsEmpty = true;
        flagSelling = false; //HERE
        document.getElementById("warehouse-status").classList = "active";
        btn_sellAFlag.disabled = true;
    }

    //Intro flow
    if (!sellingFlags) {
        makingFlagsIntro();
    } else {
        sellingFlagsIntro();
    }
}

function putFlagInWarehouse() {
    if (askMachineOn) {
        flagsInWarehouseDisplay.innerHTML = flagsInWarehouse;
        let flagIcons = document.getElementsByClassName("ascii-art icon");
        for (let i = 0; i < flagIcons.length; i++) {
            flagIcons[i].remove();
        }
    } else {
        let newFlag = document.createElement("pre");
        newFlag.ariaLabel = "A flag";
        newFlag.className = "ascii-art icon";
        newFlag.innerHTML = flagString;
        flagWarehouse.append(newFlag);
    }
}

function removeFlagFromWarehouse() {
    if (askMachineOn) {
        flagsInWarehouseDisplay.innerHTML = flagsInWarehouse;
    } else {
        flagWarehouse.removeChild(flagWarehouse.lastChild);
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
    if (flagsMade == 4) {
        nextInstruction.style.display = "inline";
    } else if (flagsMade == 6) {
        nextInstruction.innerHTML = "But, I'm thinking...";
    } else if (flagsMade == 8) {
        nextInstruction.innerHTML = "Maybe we can automate this?";
    } else if (flagsMade == 13) {
        nextInstruction.innerHTML = "I know. Let's try a machine.";
        btn_makeAFlagMachine.className = "active";
    } else if (flagMachineOn) {
        let flagMachineRunTime = flagsMade - flagMachineStartTime;
        if (flagMachineRunTime > 5) {
            nextInstruction.innerHTML = "Yes. So much better."
        }
        if (flagMachineRunTime > 15) {
            nextInstruction.innerHTML = "Um...Did you notice our funds are getting a little low"
        }
        if (flagMachineRunTime > 20) {
            nextInstruction.innerHTML = "Seriously. We're running out of cash...and space in the warehouse."
        }
        if (flagMachineRunTime > 25) {
            nextInstruction.innerHTML = "Maybe we can sell some of these flags?"
            document.getElementById("flags-sold").style.display = "inline";
            btn_sellAFlag.className = "active";
            sellingFlags = true;
        }
    }
}

function sellingFlagsIntro() {
    if (flagsSold == 4) {
        nextInstruction.innerHTML = "Sell, baby, sell.";
    } else if (flagsSold == 8) {
        nextInstruction.innerHTML = "I have a thought. What about...";
    } else if (flagsSold == 13) {
        nextInstruction.innerHTML = "a selling machine? like an Automated-Shop-Keeper?";
    } else if (flagsSold == 15) {
        nextInstruction.innerHTML = "Yes, an Automated-Shop-Keeper.";
        document.getElementById("make-an-ask-machine").classList = "active"
    }
}

//--------------------------------------------------------------

function convertToMoney(val) {
    return (Math.floor(val * 100).toFixed(0) / 100).toFixed(2);
}

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
