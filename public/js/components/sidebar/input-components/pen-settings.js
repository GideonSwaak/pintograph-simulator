class PenSettings extends HTMLElement {
    elements = {};
    connectedCallback() {
        this.innerHTML = `
            <label for="size">Pen size</label>
            <input type="number" name="size" class="size" value="${this.dataset.size || 1}">
            <label for="shadow-blur">Shadow blur</label>
            <input type="number" name="shadow-blur" class="shadow-blur" value="${this.dataset.shadowBlur || 0}">
            <label for="rainbow-color">Rainbow</label>
            <input type="checkbox" name="rainbow-color" class="rainbow-color" ${this.dataset.rainbowColor === "true" ? "checked" : ""}>
            <label for="rainbow-shadow-color">Rainbow</label>
            <input type="checkbox" name="rainbow-shadow-color" class="rainbow-shadow-color" ${this.dataset.rainbowShadowColor === "true" ? "checked" : ""}>
            <label for="color">Pen color</label>
            <input type="color" name="color" class="color" value="${this.dataset.color || "#000000"}">
            <label for="shadow-color">Shadow color</label>
            <input type="color" name="shadow-color" class="shadow-color" value="${this.dataset.shadowColor || "#000000"}">
        `;
        this.elements = {
            size: this.querySelector(".size"),
            color: this.querySelector(".color"),
            shadowBlur: this.querySelector(".shadow-blur"),
            shadowColor: this.querySelector(".shadow-color"),
            rainbowColor: this.querySelector(".rainbow-color"),
            rainbowShadowColor: this.querySelector(".rainbow-shadow-color"),
        };
    }

    getData() {
        let size = this.elements.size.valueAsNumber;
        let color = this.elements.color.value;
        let shadowBlur = this.elements.shadowBlur.valueAsNumber;
        let shadowColor = this.elements.shadowColor.value;
        let rainbowColor = this.elements.rainbowColor.checked;
        let rainbowShadowColor = this.elements.rainbowShadowColor.checked;
        if (this.elements.rainbowColor.checked) {
            color = (t) => `hsl(${(t * 4) % 360}, 80%, 60%)`;
        }
        if (this.elements.rainbowShadowColor.checked) {
            shadowColor = (t) => `hsl(${(t * 4) % 360}, 80%, 60%)`;
        }
        return {
            size,
            color,
            shadowBlur,
            shadowColor,
            rainbowColor,
            rainbowShadowColor,
        };
    }
}

customElements.define("pen-settings", PenSettings);