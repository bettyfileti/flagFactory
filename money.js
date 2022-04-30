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
                buttons.find(x => x.id === "make-a-flag").activate(true);
            } 
            
            if (factory.flagMachineOn && this.availableFunds >= flagMachineCostToMake){
                buttons.find(x => x.id === "make-a-flag").activate(true);
            }

            if (factory.askMachineOn && this.availableFunds >= askMachineCostToMake){
                buttons.find(x => x.id === "make-an-ask-machine").activate(true);
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
                buttons.find(x => x.id === "make-a-flag").activate(false);
            }
            //Can you afford to make a flag machine?
            if (this.availableFunds < flagMachineCostToMake) {
                buttons.find(x => x.id === "make-a-flag-machine").activate(false);

                if (!factory.flagMachineOn) {
                    this.youNeedMoney();
                }
            }

            //Can you afford to make an ASK machine?
            if (this.availableFunds < askMachineCostToMake) {
                buttons.find(x => x.id === "make-an-ask-machine").activate(false);
            }

            //Can you afford an upgrade?
        }

    }

    youNeedMoney() {
        let outOfMoneyText = "Time to sell a flag or two. Make some money.";
        if (narrations[narrations.length - 1].text != outOfMoneyText) {
            addingNarration(new Narration("flagFactory", outOfMoneyText));

            buttons.find(x => x.id === 'sell-a-flag').activate(true);
        }
    }
}

// function moneyIsChanged(makingMoney, howMuch) {

//     //out of money, sell a flag
//     let outOfMoneyText = "Time to sell a flag or two. Make some money.";

//     if (availableFunds <= 0) {
//         availableFunds = 0;
//         if (narrations[narrations.length - 1].text != outOfMoneyText) {
//             addingNarration(new Narration("flagFactory", outOfMoneyText));
//         }
//         buttons.find(x => x.id === 'sell-a-flag').activate(true);
//         buttons.find(x => x.id === "make-a-flag").activate(false);
//     } else if (availableFunds <= flagMachineCostToMake) {
//         if (narrations[narrations.length - 1].text != outOfMoneyText) {
//             addingNarration(new Narration("flagFactory", outOfMoneyText));
//         }
//         buttons.find(x => x.id === 'sell-a-flag').activate(true);
//         buttons.find(x => x.id === "make-a-flag-machine").activate(false);
//     }

//     if (availableFunds > flagCostToMake) {
//         buttons.find(x => x.id === "make-a-flag").activate(true);
//     }

// }