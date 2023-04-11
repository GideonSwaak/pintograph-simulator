class OscillatorInput extends HTMLElement {
    horizontal;
    length;
    lengthEl;
    angle;
    angleEl;
    speed;
    speedEl;
    
    connectedCallback() {
        this.horizontal = this.hasAttribute("h-oscillator");
        this.length = this.dataset.length;
        this.angle = this.dataset.angle;
        this.speed = this.dataset.speed;

        this.innerHTML = `
        <span>${this.horizontal ? "Horizontal" : "Vertical"} oscillator</span>
        <label for="length">Length</label>
        <input type="number" name="length" class="length" value="${this.length}">
        <label for="angle">Angle</label>
        <input type="number" name="angle" class="angle" value="${this.angle}">
        <label for="speed">Speed</label>
        <input type="number" name="speed" class="speed" value="${this.speed}">
        `;
        this.lengthEl = this.querySelector(".length");
        this.angleEl = this.querySelector(".angle");
        this.speedEl = this.querySelector(".speed");
        this.setupListeners();
    }

    setupListeners() {
        this.lengthEl.addEventListener("change", e => this.length = parseInt(e.target.value));
        this.angleEl.addEventListener("change", e => this.angle = parseFloat(e.target.value));
        this.speedEl.addEventListener("change", e => this.speed = parseFloat(e.target.value));
    }

    getData() {
        return {
            length: this.length,
            angle: this.angle,
            speed: this.speed
        };
    }

}

customElements.define("oscillator-input", OscillatorInput);