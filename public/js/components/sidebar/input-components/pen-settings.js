class PenSettings extends HTMLElement {
    elements = {};
    connectedCallback() {
        console.log(this.dataset.toolColor);
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
            <label for="tool-color">Tool color</label>
            <input type="color" name="tool-color" class="tool-color" value="${this.dataset.toolColor === 'undefined' ? generateRandomHexColor() : this.dataset.toolColor}">
        `;
        this.elements = {
            size: this.querySelector(".size"),
            color: this.querySelector(".color"),
            shadowBlur: this.querySelector(".shadow-blur"),
            shadowColor: this.querySelector(".shadow-color"),
            rainbowColor: this.querySelector(".rainbow-color"),
            rainbowShadowColor: this.querySelector(".rainbow-shadow-color"),
            toolColor: this.querySelector(".tool-color"),
        };
        this.setTitleBarColor(this.elements.toolColor.value);
        this.elements.toolColor.addEventListener("input", () => {
            this.setTitleBarColor(this.elements.toolColor.value);
        });
    }

    setTitleBarColor(color) {
        this.closest(".pinto-element").querySelector(".title-bar").style.backgroundColor = color;
        this.closest(".pinto-element").querySelector(".title-bar").style.color = blackOrWhiteFGHexColor(color);
    }

    getData() {
        let size = this.elements.size.valueAsNumber;
        let color = this.elements.color.value;
        let shadowBlur = this.elements.shadowBlur.valueAsNumber;
        let shadowColor = this.elements.shadowColor.value;
        let toolColor = this.elements.toolColor.value;
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
            toolColor,
        };
    }
}

customElements.define("pen-settings", PenSettings);

function generateRandomHexColor() {
    const randomHex = () => Math.floor(Math.random() * 255).toString(16).padStart(2, "0");
    return "#" + randomHex() + randomHex() + randomHex();
}

function blackOrWhiteFGHexColor(color) {
    const rgb = hexToRgb(color);
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 125 ? "#000000" : "#ffffff";
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}