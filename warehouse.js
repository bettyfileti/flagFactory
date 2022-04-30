class Warehouse {
    constructor() {
        this.isEmpty = true,
            this.flagCount = 0,
            this.element,
            this.stat
    }

    initialize() {
        // this.element = document.getElementById(" ");
        this.stat = (new Stat("flags-in-warehouse", "flags-warehouse-count"));
        this.stat.initialize();
        stats.push(this.stat);
    }

    addFlag(){
        this.isEmpty = false;
        this.flagCount++;
        this.stat.update()
    }

    removeFlag(){
        this.flagCount = this.flagCount - 1;
        this.stat.update();

        if (this.flagCount <= 0){
            this.isEmpty = true;
        }
    }

    // changed(addingFlag) {
    //     //addingFlag true means a flag made. False means a flag sold.

    //     if (addingFlag) {
    //         flagsInWarehouse += 1;
    //         putFlagInWarehouse();
    //     } else if (!addingFlag) {
    //         flagsInWarehouse -= 1;
    //         removeFlagFromWarehouse();
    //     }

    //     //If warehouse has flags
    //     if (flagsInWarehouse >= 1) {
    //         warehouse.isEmpty = false;
    //         buttons.find(x => x.id === 'sell-a-flag').activate(false);
    //     }

    //     // //If warehouse is empty
    //     if (flagsInWarehouse <= 0) {
    //         warehouseIsEmpty = true;
    //         flagSelling = false; //HERE
    //         document.getElementById("warehouse-status").classList = "active";
    //         buttons.find(x => x.id === 'sell-a-flag').activate(false);
    //     }

    //     //Intro flow
    //     if (!sellingFlags) {
    //         makingFlagsIntro();
    //     } else {
    //         sellingFlagsIntro();
    //     }
    // }
}