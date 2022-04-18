let flagCount = 0;
let flagsMade = 0;
let flagsSold = 0;
let availableFunds = 250;

let flagPrice = 10;
let flagCostToMake = 5;
let flagMachineCostToMake = 100;
let askMachineCostToMake = 200; 


let flagsMadeDisplay = document.getElementById("flags-made-count");
let availableFundsDisplay = document.getElementById("money-count");

let btn_makeAFlag = document.getElementById("make-a-flag");
let btn_makeAFlagMachine = document.getElementById("make-a-flag-machine");
let btn_sellAFlag = document.getElementById("sell-a-flag");
let btn_makeAnAskMachine = document.getElementById("make-an-ask-machine");

let nextInstruction = document.getElementsByClassName("next-instruction")[0];
let flagMachineOn = false;
let sellingFlags = false;
let askMachineOn = false;
let flagMachineStartTime;

let flagString = "&ensp;[&ensp;]&ensp;";
let flagWarehouse = document.getElementById("flag-warehouse");

btn_makeAFlag.addEventListener("click", makeAFlag);
btn_makeAFlagMachine.addEventListener("click", makeAFlagMachine);
btn_sellAFlag.addEventListener("click", sellAFlag);
btn_makeAnAskMachine.addEventListener("click", makeAskMachine);

//--------------------------------------------------------------

function makeAFlag() {
    flagsMade += 1;
    flagCount += 1;
    flagsMadeDisplay.innerHTML = flagsMade;

    moneyIsChanged(false, flagCostToMake);

    document.getElementById("flags-made-count-container").style.display = "flex";
    warehouseIsChanged(true);
}

function makeAFlagMachine(){
    console.log("Making a Flag Machine");
    moneyIsChanged(false, flagMachineCostToMake);
    flagMachineOn = true;
    flagMachineStartTime = flagsMade;
    setInterval(function(){ 
        //this code runs every second 
        makeAFlag();
    }, 1000);
    nextInstruction.innerHTML = "1 flag per second. So dope.";
    btn_makeAFlagMachine.disabled = "true";
}

function sellAFlag(){
    if (!sellingFlags){
        sellingFlags = true;
        document.getElementById("money-count-container").style.display = "inline";
    }
    flagsSold += 1;
    flagCount -= 1;
    document.getElementById("flags-sold-count").innerHTML = flagsSold;
    moneyIsChanged(true, flagPrice);
    warehouseIsChanged(false);
}

function makeAskMachine(){
    askMachineOn = true;
    moneyIsChanged(false, askMachineCostToMake);
    setInterval(function(){ 
        //this code runs every second 
        sellAFlag();
    }, 500);

    nextInstruction.innerHTML = "That thing can sell 2 flags every second."
    btn_makeAnAskMachine.disabled = "true";
}

//--------------------------------------------------------------

function moneyIsChanged(makingMoney, howMuch){
    //makingMoney true means adding money. False means losing money.
    if (makingMoney){
        availableFunds = availableFunds + howMuch;
    } else {
        availableFunds = availableFunds - howMuch;
    }
    availableFundsDisplay.innerHTML = convertToMoney(availableFunds);

    if (availableFunds < 0){
        document.getElementById("money-count-container").classList.add("alert");
    } else {
        document.getElementById("money-count-container").classList = "count-container active";
    }
}

function warehouseIsChanged(addingFlag){
    //addingFlag true means a flag made. False means a flag sold.
    if (addingFlag){
        putFlagInWarehouse();
    } else if (!addingFlag){
        removeFlagFromWarehouse();
    }

    //If warehouse has flags
    if (flagCount == 1){
        document.getElementById("warehouse-status").classList = "hidden";
        btn_sellAFlag.disabled = false;
    }

    //If warehouse is empty
    if (flagCount == 0){
        document.getElementById("warehouse-status").classList = "active";
        btn_sellAFlag.disabled = true;
    }

    //Intro flow
    if (!sellingFlags){
        makingFlagsIntro();
    } else {
        sellingFlagsIntro();
    }
}

function putFlagInWarehouse(){
    let newFlag = document.createElement("pre");
    newFlag.ariaLabel = "A flag";
    newFlag.class = "ascii-art";
    newFlag.innerHTML = flagString;
    flagWarehouse.append(newFlag);
}

function removeFlagFromWarehouse(){
    flagWarehouse.removeChild(flagWarehouse.lastChild);
    flagCount = flagCount - 1;
}

//--------------------------------------------------------------
// SEQUENCES
//--------------------------------------------------------------

function makingFlagsIntro(){
    if (flagsMade == 4){
       nextInstruction.style.display = "inline";
    } else if (flagsMade == 6){
        nextInstruction.innerHTML = "But, I'm thinking...";
    } else if (flagsMade == 8){
        nextInstruction.innerHTML = "Maybe we can automate this?";
    } else if (flagsMade == 13){
        nextInstruction.innerHTML = "I know. Let's try a machine.";
        btn_makeAFlagMachine.className = "active";
    } else if (flagMachineOn){       
        let flagMachineRunTime = flagsMade - flagMachineStartTime;
        if (flagMachineRunTime > 5){
            nextInstruction.innerHTML = "Yes. So much better."
        } 
        if (flagMachineRunTime > 15){
            nextInstruction.innerHTML = "Um...Did you notice our funds are getting a little low"
        }
        if (flagMachineRunTime > 20){
            nextInstruction.innerHTML = "Seriously. We're running out of cash...and space in the warehouse."
        }
        if (flagMachineRunTime > 25){
            nextInstruction.innerHTML = "Maybe we can sell some?"
            document.getElementById("flags-sold").style.display = "inline";
            btn_sellAFlag.className = "active";
            sellingFlags = true;
        }
    }
}

function sellingFlagsIntro(){
    console.log("flagsSold: ", flagsSold);
    if (flagsSold == 4){
        nextInstruction.innerHTML = "Sell, baby, sell.";
    } else if (flagsSold == 8){
        nextInstruction.innerHTML = "I have a thought. What about...";
    } else if (flagsSold == 13){
        nextInstruction.innerHTML = "a selling machine? like an Automated-Shop-Keeper?";
    } else if (flagsSold == 15){
        document.getElementById("make-an-ask-machine").classList = "active"
    }
}

//--------------------------------------------------------------

function convertToMoney(val){
    return (Math.floor(val*100).toFixed(0)/100).toFixed(2);
}
