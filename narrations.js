class Narration {
    constructor(narrator, text) {
        this.narrator = narrator,
        this.text = text,
        this.element
    }

    initialize(){
        this.element = document.createElement("p");
        this.element.innerHTML = this.text;
        this.element.id = "newest-narration";
        this.element.classList = "newest narration";
        let parentElement = document.getElementById("narration-container");
        parentElement.prepend(this.element);
        parentElement.scrollTop = parentElement.scrollHeight;
    }

    archive(){
        this.element.removeAttribute("id");
        this.element.classList = "archived narration";
    }
}