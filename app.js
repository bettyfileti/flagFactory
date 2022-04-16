let flagCount = 0;
let flagsMade = 0;
let flagsSold = 0;
let flagsMadeDisplay = document.getElementById("flags-made-count");

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

function makeAFlag() {
    flagsMade += 1;
    flagsMadeDisplay.innerHTML = flagsMade;
    document.getElementById("flags-made-count-container").style.display = "flex";
    putFlagInWarehouse();
}

function makeAFlagMachine(){
    console.log("Making a Flag Machine");
    flagMachineOn = true;
    flagMachineStartTime = flagsMade;
    setInterval(function(){ 
        //this code runs every second 
        flagsMade += 1;
        flagsMadeDisplay.innerHTML = flagsMade;
        putFlagInWarehouse();
    }, 1000);
    nextInstruction.innerHTML = "Yes, that is so much better.";
    btn_makeAFlagMachine.disabled = "true";
}

function putFlagInWarehouse(){
    let newFlag = document.createElement("pre");
    newFlag.ariaLabel = "1 flag";
    newFlag.class = "ascii-art";
    newFlag.innerHTML = flagString;
    flagWarehouse.append(newFlag);
    flagsMadeIncreased();
}

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
            nextInstruction.innerHTML = "1 flag per second. So dope."
        } 
        if (flagMachineRunTime > 15){
            nextInstruction.innerHTML = "Um...Did you notice the warehouse is getting a little crowded?"
        }
        if (flagMachineRunTime > 20){
            nextInstruction.innerHTML = "We brought you into the Flag Factory family to solve problems (not cause them)."
        }
        if (flagMachineRunTime > 25){
            nextInstruction.innerHTML = "Maybe we can sell some?"
            document.getElementById("flags-sold").style.display = "inline";
            btn_sellAFlag.className = "active";
        }
    }
}

function sellAFlag(){
    if (!sellingFlags){
        sellingFlags = true;
        document.getElementById("money-count-container").style.display = "inline";
    }
    console.log("Selling a flag");
    flagsSold += 1;
    document.getElementById("flags-sold-count").innerHTML = flagsSold;
    let flagProfit = convertToMoney(flagsSold * 5);
    document.getElementById("money-count").innerHTML = flagProfit;
    removeFlagFromWarehouse();
}

function removeFlagFromWarehouse(){
    flagWarehouse.removeChild(flagWarehouse.lastChild);
    flagCount = flagCount - 1;
}

//--------------------------------------------------------------

function convertToMoney(val){
    return (Math.floor(val*100).toFixed(0)/100).toFixed(2);
}
