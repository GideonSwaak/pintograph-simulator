class OscillatorInput extends HTMLElement {
    horizontal;
    elements;
    
    connectedCallback() {
        this.horizontal = this.hasAttribute("h-oscillator");
        this.innerHTML = `
        <span>${this.horizontal ? "Horizontal" : "Vertical"} oscillator</span>
        <label for="length">Length</label>
        <input type="number" name="length" class="length" value="${this.dataset.length}">
        <label for="angle">Angle</label>
        <input type="number" name="angle" class="angle" value="${this.dataset.angle}">
        <label for="speed">Speed</label>
        <input type="number" name="speed" class="speed" value="${this.dataset.speed}">
        `;
        this.elements = {
            length: this.querySelector(".length"),
            angle: this.querySelector(".angle"),
            speed: this.querySelector(".speed"),
        }
    }

    getData() {
        return {
            length: this.elements.length.valueAsNumber,
            angle: this.elements.angle.valueAsNumber,
            speed: this.elements.speed.valueAsNumber,
        };
    }

}

customElements.define("oscillator-input", OscillatorInput);