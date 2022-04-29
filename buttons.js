class Button {
    constructor(id, clickFunction, label, narrator) {
        this.id = id,
            this.clickFunction = clickFunction,
            this.label = label,
            this.isHidden = true,
            this.isActive = false,
            this.hasBeenStarted = false,
            this.narrator = narrator, //flagFactory or repairman
            this.currentRate,
            this.costOfNext,
            this.btn
    }

    initialize() {
        //this.btn = document.getElementById(this.id);
        this.btn = document.createElement("button");
        this.btn.id = this.id;
        this.btn.className = "hidden";
        this.btn.type = "button";
        this.btn.addEventListener("click", this.clickFunction);
        this.btn.innerHTML = this.label;

        let parentElement;
        if (this.narrator === "flagFactory"){
            parentElement = document.getElementById("flagFactory-buttons");
        } else if (this.narrator === "repairman"){
            parentElement = document.getElementById("repairman-buttons");
        } else {
            error.log("missing parent element for button");
        }
        
        parentElement.append(this.btn);
    }

    activate(isNowActive){
        
        if (isNowActive){
            this.isActive = true;
            this.btn.className = "active";
            this.btn.disabled = false;
            this.hasBeenStarted = true;
        } else {
            this.isActive = false;
            this.btn.disabled = true;
        }

    }

    updateLabel() {
        if (this.id === "make-a-flag"){
            this.btn.innerHTML = this.label + " (-$" + convertToMoney(flagCostToMake) + ")";
        } else if (this.id === "make-a-flag-machine"){
            this.btn.innerHTML = this.label +  " (-$" + convertToMoney(flagMachineCostToMake) + ")";
        } else if (this.id === "sell-a-flag"){
            this.btn.innerHTML = this.label + " (+$" + convertToMoney(flagPrice) + ")";
        } else if (this.id === "make-an-ask-machine"){
            this.btn.innerHTML = this.label + " (-$" + convertToMoney(askMachineCostToMake) + ")";
        }
    }

}

//--------------------------------------------------------------
// Main Functions
//--------------------------------------------------------------

function makeAFlag() {
    if (warehouseIsEmpty && askMachineOn) {
        console.log("empty warehouse + askMachineOn, but trying to make flags");
        //Come back here to fix!
        //Warehouse is empty and ASK machine is off, but flag machine is still on, so it keeps adding a flag in and then selling 2.
        //The ASK Machine should require a minimum of 5 flags to be in the warehouse in order to run.
    } else {
        flagsMade += 1;
        //flagsMadeDisplay.innerHTML = flagsMade;
        //document.getElementById("flags-made-count-container").style.display = "flex";
        warehouseIsChanged(true);
        moneyIsChanged(false, flagCostToMake);

        if (flagsMade != flagsInWarehouse + flagsSold) {
            console.log("Something is not adding up");
            giveMeInfo();
        }
    }

}

//------

function makeAFlagMachine() {
    console.log("Making a Flag Machine");
    moneyIsChanged(false, flagMachineCostToMake);
    flagMachineOn = true;
    flagMachineStartTime = flagsMade;
    setInterval(function () {
        makeAFlag();
    }, 1000);

    addingNarration(new Narration("flagFactory", "1 flag every second. So dope."));  
    buttons.find(x => x.id === 'make-a-flag-machine').activate(false);
    stats.find(x => x.id === "flag-machine-per-sec").activate();
}

//------

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
    
        warehouseIsChanged(false);
        moneyIsChanged(true, flagPrice);
    }
}

//------

function makeAskMachine() {
    askMachineOn = true;
    moneyIsChanged(false, askMachineCostToMake);

    setInterval(function () {
        //this code runs every second 
        sellAFlag();
    }, 500);

    buildWarehouseShelves();
    addingNarration(new Narration("flagFactory", "That baby is selling 2 flags every second."));  
    buttons.find(x => x.id === 'make-ask-machine').activate(false);

}

//--------------------------------------------------------------
//
//--------------------------------------------------------------
