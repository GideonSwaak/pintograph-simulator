class ArmInput extends HTMLElement {
    xArm = false;
    elements;

    connectedCallback() {
        this.xArm = this.hasAttribute("x-arm");
        this.innerHTML = `
            <span>${this.xArm ? "X-arm" : "V-arm"}</span>
            <label for="length1">Length 1</label><input type="number" class="length1" value="${this.dataset.length1}">
            <label for="length2">Length 2</label><input type="number" class="length2" value="${this.dataset.length2}">
        `;
        if (this.xArm) {
            this.innerHTML += `
                <label for="extensionLength1">Ext length 1</label><input type="number" class="extensionLength1" value="${this.dataset.extensionLength1}">
                <label for="extensionLength2">Ext length 2</label><input type="number" class="extensionLength2" value="${this.dataset.extensionLength2}">
            `;
        }
        this.innerHTML += `<label for="flip" class="right">Flip</label><input type="checkbox" class="flip" class="right" ${this.dataset.flip === "true" ? "checked" : ""}>`;
        this.elements = {
            length1: this.querySelector(".length1"),
            length2: this.querySelector(".length2"),
            extensionLength1: this.querySelector(".extensionLength1"),
            extensionLength2: this.querySelector(".extensionLength2"),
            flip: this.querySelector(".flip"),
        };
    }

    getData() {
        if (this.xArm) {
            return {
                length1: this.elements.length1.valueAsNumber,
                length2: this.elements.length2.valueAsNumber,
                extensionLength1: this.elements.extensionLength1.valueAsNumber,
                extensionLength2: this.elements.extensionLength2.valueAsNumber,
                flip: this.elements.flip.checked,
            };
        } else {
            return {
                length1: this.elements.length1.valueAsNumber,
                length2: this.elements.length2.valueAsNumber,
                flip: this.elements.flip.checked,
            };
        }
    }
    
}

customElements.define("arm-input", ArmInput);