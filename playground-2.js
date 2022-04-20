let realImage = document.getElementById("real-image");

let btn_makeARealFlag = document.getElementById("make-a-flag-real");
btn_makeARealFlag.addEventListener("click", makeARealFlag);

function makeARealFlag(){
    let myNewDiv = realImage.cloneNode(true);
    myNewDiv.id = " ";
    myNewDiv.classList = "active";

    document.getElementById("add-image-here").append(myNewDiv);
}
