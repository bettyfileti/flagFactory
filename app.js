let flagCount = 0;
let flagCountDisplay = document.getElementById("flag-count");
let btn_makeAFlag = document.getElementById("make-a-flag");
let btn_makeAFlagMachine = document.getElementById("make-a-flag-machine");

let flagString = "[&ensp;]";
let flagWarehouse = document.getElementById("flag-warehouse");

btn_makeAFlag.addEventListener("click", makeAFlag);
btn_makeAFlagMachine.addEventListener("click", makeAFlagMachine);

function makeAFlag() {
    flagCount += 1;
    flagCountDisplay.innerHTML = flagCount;
    document.getElementsByClassName("flag-count-container")[0].style.display = "flex";
    putFlagInWarehouse();
}

function makeAFlagMachine(){
    console.log("Making a Flag Machine")
    setInterval(function(){ 
        //this code runs every second 
        flagCount += 1;
        flagCountDisplay.innerHTML = flagCount;
        putFlagInWarehouse();
    }, 1000);
}

function putFlagInWarehouse(){
    let newFlag = document.createElement("pre");
    newFlag.ariaLabel = "1 flag"
    newFlag.class = "ascii-art"
    newFlag.innerHTML = flagString;
    flagWarehouse.append(newFlag);
}
