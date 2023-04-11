class SimpleWheel extends HTMLElement {
    elements = {};
    connectedCallback() {
        let point = this.dataset.point;
        let subwheel = this.hasAttribute("subwheel");
        this.innerHTML = `
            <span>${subwheel ? "Subwheel" : "Simple wheel"} ${point}</span><br>
            <label for="radius">Radius</label>
            <input type="number" name="radius" value="${this.dataset.radius}">
            <label for="startAngle">Start angle</label>
            <input type="number" name="startAngle" value="${this.dataset.startAngle}">
            <label for="speed">Speed</label>
            <input type="number" name="speed" value="${this.dataset.speed}">
        `;
        this.elements.radius = this.querySelector("input[name='radius']");
        this.elements.startAngle = this.querySelector("input[name='startAngle']");
        this.elements.speed = this.querySelector("input[name='speed']");
    }

    getData() {
        return {
            radius: parseFloat(this.elements.radius.value),
            startAngle: parseFloat(this.elements.startAngle.value),
            speed: parseFloat(this.elements.speed.value)
        }
    }
}

customElements.define("simple-wheel", SimpleWheel);