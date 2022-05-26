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
            
            if (factory.flagMachineAvailable && this.availableFunds >= flagMachineCostToMake){
                buttons.find(x => x.id === "buy-a-flag-machine").makeClickable(true);
            }

            if (factory.askMachineAvailable && this.availableFunds >= askMachineCostToMake){
                buttons.find(x => x.id === "buy-an-ask-machine").makeClickable(true);
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
            //Can you afford to make a flag machine?
            if (this.availableFunds < flagMachineCostToMake) {
                buttons.find(x => x.id === "buy-a-flag-machine").makeClickable(false);

                if (factory.flagMachineAvailable) {
                    this.youNeedMoney();
                }
            }

            //Can you afford to make an ASK machine?
            if (this.availableFunds < askMachineCostToMake) {
                buttons.find(x => x.id === "buy-an-ask-machine").makeClickable(false);
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