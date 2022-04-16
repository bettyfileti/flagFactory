let flagCount = 0;
let flagsMade = 0;
let flagsSold = 0;
let flagsMadeDisplay = document.getElementById("flags-made-count");

let btn_makeAFlag = document.getElementById("make-a-flag");
let btn_makeAFlagMachine = document.getElementById("make-a-flag-machine");
let btn_sellAFlag = document.getElementById("sell-a-flag");
let nextInstruction = document.getElementsByClassName("next-instruction")[0];
let flagMachineOn = false;
let flagMachineStartTime;

let flagString = "&ensp;[&ensp;]&ensp;";
let flagWarehouse = document.getElementById("flag-warehouse");

btn_makeAFlag.addEventListener("click", makeAFlag);
btn_makeAFlagMachine.addEventListener("click", makeAFlagMachine);
btn_sellAFlag.addEventListener("click", sellAFlag);

function makeAFlag() {
    flagsMade += 1;
    flagsMadeDisplay.innerHTML = flagsMade;
    document.getElementsByClassName("flags-made-container")[0].style.display = "flex";
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
    nextInstruction.innerHTML = "That is so much better.";
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
    if (flagsMade == 6){
        nextInstruction.style.display = "inline";
    } else if (flagsMade == 8){
        nextInstruction.innerHTML = "Maybe we can automate this?";
    } else if (flagsMade == 11){
        nextInstruction.innerHTML = "I know. Let's try a machine.";
        btn_makeAFlagMachine.className = "active";
    } else if (flagMachineOn){       
        if ((flagsMade - flagMachineStartTime) > 5){
            nextInstruction.innerHTML = "The warehouse is getting a little crowded."
        } 
        if ((flagsMade - flagMachineStartTime) > 10){
            nextInstruction.innerHTML = "Maybe we can sell some?"
            document.getElementById("flags-sold").style.display = "inline";
            btn_sellAFlag.className = "active";
        }
    }
}

function sellAFlag(){
    console.log("Selling a flag");
    flagsSold += 1;
    document.getElementById("flags-sold-count").innerHTML = flagsSold;
    removeFlagFromWarehouse();
}

function removeFlagFromWarehouse(){
    flagWarehouse.removeChild(flagWarehouse.lastChild);
    flagCount = flagCount - 1;
}
