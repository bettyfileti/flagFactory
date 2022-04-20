let newFlagName;
let newFlagNameInput = document.getElementById("flag-name");
let btn_CustomizeAFlag = document.getElementById("customize-a-flag");
let textToReplace = document.getElementById("flag-text-replace");

btn_CustomizeAFlag.addEventListener("click", customizeFlag);

function customizeFlag(){
    console.log(newFlagNameInput.value);
    let lineLength = textToReplace.innerHTML.length;

    let newText = newFlagNameInput.value;
    let difference = lineLength - newText.length;

    console.log(difference);
    let prePend = " ";
    prePend = prePend.repeat(difference/2);
    newText = prePend + newText + prePend;

    if (newText.length != lineLength) {
        newText = newText + " ";
    }
    textToReplace.innerHTML = newText;
}

