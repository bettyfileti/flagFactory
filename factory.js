class Factory {
    constructor() {
        this.flagsMade,
        this.flagsSold,
        this.flagMachineOn = false,
        this.sellingFlags = false,
        this.askMachineOn = false,
        this.flagMachineStartTime;
    }

    initialize() {
        this.flagsMade = flagsMade;
        this.flagsSold = flagsSold;
    }

    //------

    makeAFlag() {
        //Use "factory."" instead of "this." so it affects the global values, instead of the trigger button.
        if (warehouse.isEmpty && this.askMachineOn) {
            console.log("empty warehouse + askMachineOn, but trying to make flags");
        } else {
            factory.flagsMade += 1;

            warehouse.addFlag();
            money.spendingMoney(flagCostToMake);

            if (factory.flagsMade != warehouse.flagCount + factory.flagsSold) {
                console.log("//------");
                console.log("Something is not adding up");
                giveMeInfo();
            }
        }

        if (!factory.sellingFlags){
            makingFlagsIntro(); //Probably a better way to handle the sequencing
        } else {
            sellingFlagsIntro();
        }
    }

    makeAFlagMachine(){
        console.log("Making a Flag Machine");
        money.spendingMoney(flagMachineCostToMake);
        factory.flagMachineOn = true;
        factory.flagMachineStartTime = this.flagsMade;
        setInterval(function () {
            factory.makeAFlag();
        }, 1000);
    
        addingNarration(new Narration("flagFactory", "1 flag every second. So dope."));
        buttons.find(x => x.id === 'make-a-flag-machine').activate(false);
        stats.find(x => x.id === "flag-machine-per-sec").activate();
    }

    sellAFlag() {
        if (warehouse.isEmpty) {
            console.log("Warehouse is empty.")
        } else {
            if (!factory.sellingFlags) {
                factory.sellingFlags = true;
                document.getElementById("money-count-container").style.display = "inline";
            }
            factory.flagsSold += 1;
    
            warehouse.removeFlag();
            money.makingMoney(flagPrice);
        }
    }


    makeAskMachine(){
        this.askMachineOn = true;
        money.spendingMoney(askMachineCostToMake);
    
        setInterval(function () {
            //this code runs every second 
            this.sellAFlag();
        }, 500);
    
        // buildWarehouseShelves();
        addingNarration(new Narration("flagFactory", "That baby is selling 2 flags every second."));
        buttons.find(x => x.id === 'make-ask-machine').activate(false);
    }

    //------

    
}
