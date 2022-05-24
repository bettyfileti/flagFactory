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

    addFlag() {
        this.isEmpty = false;
        this.flagCount++;
        this.stat.update()

        if (!this.isEmpty && factory.sellingFlags) {
            buttons.find(x => x.id === 'sell-a-flag').makeClickable(true);
        }
    }

    removeFlag() {
        this.flagCount = this.flagCount - 1;
        this.stat.update();

        if (this.flagCount <= 0) {
            this.isEmpty = true;
            addingNarration(new Narration("flagFactory", "Can't sell what you don't have, buddy. Make a flag."));
            buttons.find(x => x.id === 'sell-a-flag').makeClickable(false);
            //Turn off ASK machine
        }
    }
}