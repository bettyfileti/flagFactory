class Factory {
    constructor() {
        this.flagsMade,
            this.flagsSold,
            this.flagMachineAvailable = false,
            this.flagMachineOn = false,
            this.flagMachinesBought = 0,
            this.sellingFlags = false,
            this.askMachineAvailable = false,
            this.askMachineOn = false,
            this.flagMachineStartTime
    }

    initialize() {
        this.flagsMade = flagsMade;
        this.flagsSold = flagsSold;
    }

    //------

    makeAFlagAvailable(buttonIsAvailable) {
        buttons.find(x => x.id === "make-a-flag").makeClickable(buttonIsAvailable);
    }

    makeAFlag() {
        //Use "factory."" instead of "this." so it affects the global values, instead of the trigger button.
        let makingStat = stats.find(x => x.id === "flags-made-per-click");
        if (makingStat.isHidden) {
            makingStat.makeVisible();
        }

        if (warehouse.isEmpty && this.askMachineOn) {
            console.log("empty warehouse + askMachineOn, but trying to make flags");
        } else {
            factory.flagsMade += 1;

            warehouse.addFlag();
            money.spendingMoney(flagCostToMake);
            //TURN THIS ON
            // if (factory.flagsMade != warehouse.flagCount + factory.flagsSold) {
            //     console.log("//------");
            //     console.log("Something is not adding up");
            //     giveMeInfo();
            // }
        }

        if (!factory.sellingFlags) {
            makingFlagsIntro(); //Probably a better way to handle the sequencing
        } else {
            //sellingFlagsIntro();
        }
    }

    makeFlagMachineAvailable() {
        console.log("Making Flag Machine Available");
        if (money.availableFunds >= flagMachineCostToMake) {
            buttons.find(x => x.id === 'buy-a-flag-machine').makeVisible(true);
            buttons.find(x => x.id === 'buy-a-flag-machine').makeClickable(true);
        } else {
            buttons.find(x => x.id === 'buy-a-flag-machine').makeClickable(false);
        }
        this.flagMachineAvailable = true;
    }

    buyAFlagMachine() {
        console.log("Buying a Flag Machine");
        factory.flagMachinesBought++;
        money.spendingMoney(flagMachineCostToMake);
        factory.flagMachineOn = true;
        factory.flagMachineStartTime = this.flagsMade;
        setInterval(function () {
            factory.makeAFlag();
        }, 1000);

        addingNarration(new Narration("flagFactory", "1 flag every second. So dope."));
        stats.find(x => x.id === "flag-machine-per-sec").makeVisible();
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
            theWorld.addFlag();
        }
    }

    makeASKMachineAvailable() {

        if (!factory.askMachineAvailable) {
            console.log("Making ASK Machine Available");
            buttons.find(x => x.id === "buy-an-ask-machine").makeVisible(true);
            stats.find(x => x.id === "ask-machine-per-sec").makeVisible();
            factory.askMachineAvailable = true;
        } else {

        }


    }

    buyAskMachine() {
        console.log("Buying an ASK Machine");
        factory.askMachineOn = true;
        money.spendingMoney(askMachineCostToMake);

        setInterval(function () {
            //1000 runs every second 
            factory.sellAFlag();
        }, 1000);

        // buildWarehouseShelves();
        addingNarration(new Narration("flagFactory", "That baby is selling 1 flags every second."));
        buttons.find(x => x.id === "buy-an-ask-machine").makeClickable(false);
        stats.find(x => x.id === "ask-machine-per-sec").makeVisible();

    }

    //------

    runFactory() {
        //console.log("factory is up and running");
        if (factory.askMachineAvailable) {

        }
    }


}
