class PenSettings extends HTMLElement {
    penSizeEl;
    penColorEl;
    penShadowBlurEl;
    penShadowColorEl;
    penSize = 1;
    penColor = "#000000";
    shadowBlur = 0;
    shadowColor = "#000000";

    connectedCallback() {
        this.innerHTML = `
        <label for="pen-size">Pen size</label>
        <input type="number" name="pen-size" class="pen-size" value="1">
        <label for="pen-color">Pen color</label>
        <input type="color" name="pen-color" class="pen-color" value="#000000">
        <label for="pen-shadow-blur">Shadow blur</label>
        <input type="number" name="pen-shadow-blur" class="pen-shadow-blur" value="0">
        <label for="pen-shadow-color">Shadow color</label>
        <input type="color" name="pen-shadow-color" class="pen-shadow-color" value="#000000">
        `;
        this.penSizeEl = this.querySelector(".pen-size");
        this.penColorEl = this.querySelector(".pen-color");
        this.penShadowBlurEl = this.querySelector(".pen-shadow-blur");
        this.penShadowColorEl = this.querySelector(".pen-shadow-color");
        this.setupListeners();
    }

    setupListeners() {
        this.penSizeEl.addEventListener("input", event => {
            this.penSize = event.target.value;
        });
        this.penColorEl.addEventListener("input", event => {
            this.penColor = event.target.value;
            if (this.penColor === "#454545") {
                this.penColor = (t) => `hsl(${(t * 4) % 360}, 80%, 60%)`;
            }
        });
        this.penShadowBlurEl.addEventListener("input", event => {
            this.shadowBlur = event.target.value;
        });
        this.penShadowColorEl.addEventListener("input", event => {
            this.shadowColor = event.target.value;
            if (this.shadowColor === "#454545") {
                this.shadowColor = (t) => `hsl(${(t * 4) % 360}, 80%, 60%)`;
            }
        });
    }
}

customElements.define("pen-settings", PenSettings);