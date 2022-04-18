let flagCount = 0;
let flagsMade = 0;
let flagsSold = 0;
let availableFunds = 250;

let flagPrice = 10;
let flagCostToMake = 5;
let flagMachineCostToMake = 100;


let flagsMadeDisplay = document.getElementById("flags-made-count");
let availableFundsDisplay = document.getElementById("money-count");

let btn_makeAFlag = document.getElementById("make-a-flag");
let btn_makeAFlagMachine = document.getElementById("make-a-flag-machine");
let btn_sellAFlag = document.getElementById("sell-a-flag");
let nextInstruction = document.getElementsByClassName("next-instruction")[0];
let flagMachineOn = false;
let sellingFlags = false;
let flagMachineStartTime;

let flagString = "&ensp;[&ensp;]&ensp;";
let flagWarehouse = document.getElementById("flag-warehouse");

btn_makeAFlag.addEventListener("click", makeAFlag);
btn_makeAFlagMachine.addEventListener("click", makeAFlagMachine);
btn_sellAFlag.addEventListener("click", sellAFlag);


function flagsMadeIncreased(){
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
        }
    }
}

//--------------------------------------------------------------

function makeAFlag() {
    flagsMade += 1;
    flagCount += 1;
    flagsMadeDisplay.innerHTML = flagsMade;

    moneyIsChanged(false, flagCostToMake);

    document.getElementById("flags-made-count-container").style.display = "flex";
    putFlagInWarehouse();
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
    nextInstruction.innerHTML = "$100 for a machine that makes 1 flag per second. So dope.";
    btn_makeAFlagMachine.disabled = "true";
}


function sellAFlag(){
    if (!sellingFlags){
        sellingFlags = true;
        document.getElementById("money-count-container").style.display = "inline";
    }
    flagsSold += 1;
    document.getElementById("flags-sold-count").innerHTML = flagsSold;
    moneyIsChanged(true, flagPrice);
    removeFlagFromWarehouse();
}

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

//--------------------------------------------------------------

function putFlagInWarehouse(){
    let newFlag = document.createElement("pre");
    newFlag.ariaLabel = "1 flag";
    newFlag.class = "ascii-art";
    newFlag.innerHTML = flagString;
    flagWarehouse.append(newFlag);
    if (flagCount == 1){
        document.getElementById("warehouse-status").classList = "hidden";
        btn_sellAFlag.disabled = false;
    }
    flagsMadeIncreased();
}

function removeFlagFromWarehouse(){
    flagWarehouse.removeChild(flagWarehouse.lastChild);
    flagCount = flagCount - 1;
    if (flagCount == 0){
        document.getElementById("warehouse-status").classList = "active";
        btn_sellAFlag.disabled = true;
    }
}

//--------------------------------------------------------------

function convertToMoney(val){
    return (Math.floor(val*100).toFixed(0)/100).toFixed(2);
}
