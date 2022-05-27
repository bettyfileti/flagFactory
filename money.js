class Money {
    constructor() {
        this.availableFunds,
            this.element,
            this.outOfMoney = false
    }

    initialize() {
        this.availableFunds = availableFunds;
        this.element = document.getElementById("money-count");
        this.updateElement();
    }

    makingMoney(howMuch) {
        this.availableFunds = this.availableFunds + howMuch;
        this.whatCanYouAfford(true);
        this.updateElement();
    }

    spendingMoney(howMuch) {
        this.availableFunds = this.availableFunds - howMuch;
        this.whatCanYouAfford(false);
        this.updateElement();
    }

    updateElement() {
        this.element.innerHTML = convertToMoney(this.availableFunds);
    }

    whatCanYouAfford(makingMoney) {
        if (makingMoney) {

            if (this.availableFunds >= flagCostToMake){
                factory.makeAFlagAvailable(true);
            } 
            
            if (factory.makingMachineAvailable && this.availableFunds >= makingMachineCostToMake){
                buttons.find(x => x.id === "buy-a-making-machine").makeClickable(true);
            }

            if (factory.sellingMachineAvailable && this.availableFunds >= sellingMachineCostToMake){
                buttons.find(x => x.id === "buy-an-selling-machine").makeClickable(true);
            }

        } else {
            //Are you out of money?
            if (this.availableFunds <= 0) {
                this.availableFunds = 0;
                this.outOfMoney = true;
                this.youNeedMoney();
            } else {
                this.availableFunds = this.availableFunds;
                this.outOfMoney = false;
            }

            //Can you afford to make a flag?
            if (this.availableFunds < flagCostToMake) {
                addingNarration(new Narration("flagFactory", "It takes money to make money. Sell a flag or two."));
                buttons.find(x => x.id === "make-a-flag").makeClickable(false);
            }
            //Can you afford to make a Making Machine?
            if (this.availableFunds < makingMachineCostToMake) {
                buttons.find(x => x.id === "buy-a-making-machine").makeClickable(false);

                if (factory.makingMachineAvailable) {
                    this.youNeedMoney();
                }
            }

            //Can you afford to make an Selling machine?
            if (this.availableFunds < sellingMachineCostToMake) {
                buttons.find(x => x.id === "buy-an-selling-machine").makeClickable(false);
            }

            //Can you afford an upgrade?
        }

    }

    youNeedMoney() {
        let outOfMoneyText = "Time to sell a flag or two. Make some money.";
        if (narrations.length > 0){
            if (narrations[narrations.length - 1].text != outOfMoneyText) {
                addingNarration(new Narration("flagFactory", outOfMoneyText));
                buttons.find(x => x.id === 'sell-a-flag').makeVisible(true);
            }
        }

    }
}