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
            this.askMachinesBought = 0,
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

        console.log()

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
        }, 1000 / factory.flagMachinesBought); //Dividing it here helps to speed it up.

        addingNarration(new Narration("flagFactory", factory.flagMachinesBought + " flag every second. So dope."));
        stats.find(x => x.id === "flag-machine-per-sec").makeVisible();

        //Upgrade mechanism
        if (factory.flagMachinesBought > 0) {
            flagMachineCostToMake = upgradeMachine(flagMachineCostToMake, factory.flagMachinesBought, flagMachineRate); //(currentCost, numberOfUpgrades, upgradeRate);
            buttons.find(x => x.id === 'buy-a-flag-machine').updateLabel();
        }
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
        factory.askMachinesBought++;

        setInterval(function () {
            //1000 runs every second 
            factory.sellAFlag();
        }, 1000 / factory.askMachinesBought);

        // buildWarehouseShelves();
        addingNarration(new Narration("flagFactory", "That baby is selling 1 flags every second."));
        buttons.find(x => x.id === "buy-an-ask-machine").makeClickable(false);
        stats.find(x => x.id === "ask-machine-per-sec").makeVisible();

        if (factory.askMachinesBought > 0){
            askMachineCostToMake = upgradeMachine(askMachineCostToMake, factory.askMachinesBought, askMachineRate); //(currentCost, numberOfUpgrades, upgradeRate);
            buttons.find(x => x.id === "buy-an-ask-machine").updateLabel();
        }

    }   


    //------

    runFactory() {
        //console.log("factory is up and running");
        if (factory.askMachineAvailable) {

        }
    }


}


function upgradeMachine(currentCost, numberOfUpgrades, upgradeRate, machineButton){
    console.log("currentCost:", currentCost);
    console.log("numberOfUpgrades:", numberOfUpgrades);
    console.log("upgradeRate:", upgradeRate);
    console.log("machineButton:", machineButton);
    let newCost = currentCost * (1 + upgradeRate) ** numberOfUpgrades;
    console.log("newCost:", newCost);
    return newCost;
}