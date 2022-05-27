class Factory {
    constructor() {
        this.flagsMade,
            this.flagsSold,
            this.makingMachineAvailable = false,
            this.makingMachineOn = false,
            this.makingMachinesBought = 0,
            this.sellingFlags = false,
            this.sellingMachineAvailable = false,
            this.sellingMachineOn = false,
            this.sellingMachinesBought = 0,
            this.makingMachineStartTime
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

        for (let i = 0; i < flagsPerClick; i++) {
            let makingStat = stats.find(x => x.id === "flags-made-per-click");
            if (makingStat.isHidden) {
                makingStat.makeVisible();
            }

            if (warehouse.isEmpty && this.sellingMachineOn) {
                console.log("empty warehouse + sellingMachineOn, but trying to make flags");
            } else {
                factory.flagsMade += 1;

                warehouse.addFlag();
                money.spendingMoney(flagCostToMake);

                //TURN THIS ON
                if (factory.flagsMade != warehouse.flagCount + factory.flagsSold) {
                    console.log("//------");
                    console.log("Something is not adding up");
                    giveMeInfo();
                }
            }
        }

    }

    makemakingMachineAvailable() {
        console.log("Making Making Machine Available");
        if (money.availableFunds >= makingMachineCostToMake) {
            buttons.find(x => x.id === 'buy-a-making-machine').makeVisible(true);
            buttons.find(x => x.id === 'buy-a-making-machine').makeClickable(true);
        } else {
            buttons.find(x => x.id === 'buy-a-making-machine').makeClickable(false);
        }
        this.makingMachineAvailable = true;
    }

    buyAmakingMachine() {
        console.log("Buying a Making Machine");
        if (factory.makingMachinesBought === 0) {
            factory.makingMachinesBought = factory.sellingMachinesBought; //equalize the making and the selling
        } else {
            factory.makingMachinesBought++;
        }
        money.spendingMoney(makingMachineCostToMake);
        factory.makingMachineOn = true;
        factory.makingMachineStartTime = this.flagsMade;
        setInterval(function () {
            factory.makeAFlag();
        }, 900 / factory.makingMachinesBought); //Dividing it here to control rate. Try a slightly lower interval than selling.

        addingNarration(new Narration("flagFactory", factory.makingMachinesBought + " flag every second. So dope."));
        stats.find(x => x.id === "making-machine-per-sec").makeVisible();

        //Upgrade mechanism
        if (factory.makingMachinesBought > 0) {
            makingMachineCostToMake = upgradeMachine(makingMachineCostToMake, factory.makingMachinesBought, makingMachineRate); //(currentCost, numberOfUpgrades, upgradeRate);
            buttons.find(x => x.id === 'buy-a-making-machine').updateLabel();
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

    makesellingMachineAvailable() {

        if (!factory.sellingMachineAvailable) {
            console.log("Making Selling Machine Available");
            buttons.find(x => x.id === "buy-an-selling-machine").makeVisible(true);
            stats.find(x => x.id === "selling-machine-per-sec").makeVisible();
            factory.sellingMachineAvailable = true;
        } else {

        }


    }

    buysellingMachine() {
        console.log("Buying an Selling Machine");
        factory.sellingMachineOn = true;
        money.spendingMoney(sellingMachineCostToMake);
        factory.sellingMachinesBought++;

        setInterval(function () {
            //1000 runs every second 
            factory.sellAFlag();
        }, 1000 / factory.sellingMachinesBought);

        // buildWarehouseShelves();
        if (factory.sellingMachinesBought === 1) {
            addingNarration(new Narration("flagFactory", "That baby is selling " + factory.sellingMachinesBought + " flag every second."));
        } else {
            addingNarration(new Narration("flagFactory", "That baby is selling " + factory.sellingMachinesBought + " flags every second."));
        }
        buttons.find(x => x.id === "buy-an-selling-machine").makeClickable(false);
        stats.find(x => x.id === "selling-machine-per-sec").makeVisible();

        if (factory.sellingMachinesBought > 0) {
            sellingMachineCostToMake = upgradeMachine(sellingMachineCostToMake, factory.sellingMachinesBought, sellingMachineRate); //(currentCost, numberOfUpgrades, upgradeRate);
            buttons.find(x => x.id === "buy-an-selling-machine").updateLabel();
        }

    }


    //------

    runFactory() {
        //console.log("factory is up and running");
        if (factory.sellingMachineAvailable) {

        }
    }


}


function upgradeMachine(currentCost, numberOfUpgrades, upgradeRate) {
    numberOfUpgrades = numberOfUpgrades + 1;
    console.log("currentCost:", currentCost);
    console.log("numberOfUpgrades:", numberOfUpgrades);
    console.log("upgradeRate:", upgradeRate);
    let newCost = currentCost * Math.pow((1 + upgradeRate), numberOfUpgrades);
    console.log("newCost:", newCost);
    return newCost;
}