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

        if (this.id === "make-a-flag"){
            this.btn.addEventListener("click", factory.makeAFlag);
        }

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
