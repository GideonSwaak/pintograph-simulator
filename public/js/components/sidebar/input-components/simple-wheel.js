class SimpleWheel extends HTMLElement {
    elements = {};
    connectedCallback() {
        let point = this.dataset.point;
        let subwheel = this.hasAttribute("subwheel");
        this.innerHTML = `
            <span>${subwheel ? "Subwheel" : "Simple wheel"} ${point}</span>
            <label for="radius">Radius</label>
            <input type="number" name="radius" value="${this.dataset.radius}">
            <label for="startAngle">Start angle</label>
            <input type="number" name="startAngle" value="${this.dataset.startAngle}">
            <label for="speed">Speed</label>
            <input type="number" name="speed" value="${this.dataset.speed}">
        `;
        this.elements = {
            radius: this.querySelector("input[name='radius']"),
            startAngle: this.querySelector("input[name='startAngle']"),
            speed: this.querySelector("input[name='speed']"),
        }
    }

    getData() {
        return {
            radius: this.elements.radius.valueAsNumber,
            startAngle: this.elements.startAngle.valueAsNumber,
            speed: this.elements.speed.valueAsNumber
        }
    }
}

customElements.define("simple-wheel", SimpleWheel);