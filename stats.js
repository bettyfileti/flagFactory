class Stat {
    constructor(id, valueID) {
        this.id = id,
        this.valueID = valueID,
        this.value,
        this.isHidden,
        this.domElement
    }

    initialize() {
        this.domElement = document.getElementById(this.id);
        this.value = document.getElementById(this.valueID);
    }

    makeVisible() {
        this.domElement.className = "active";
        this.isHidden = false;
        this.update();
    }

    update() {
        if (this.id === "flags-in-warehouse"){
            this.value.innerHTML = warehouse.flagCount;
        } else if (this.id === "flags-made-per-click") {
            this.value.innerHTML = flagsPerClick;
        } else if (this.id === "flag-machine-per-sec"){
            this.value.innerHTML = flagMachineRate;
        } else if (this.id === "flags-sold-per-click"){
            this.value.innerHTML = flagsSoldPerClick;
        } else if (this.id === "ask-machine-per-sec"){
            this.value.innerHTML = askMachineRate;
        }
        
    }

}