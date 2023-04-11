class ArmInput extends HTMLElement {
    xArm = false;
    length1;
    length2;
    extensionLength1;
    extensionLength2;
    flip;

    connectedCallback() {
        this.xArm = this.hasAttribute("x-arm");
        this.length1 = this.dataset.length1;
        this.length2 = this.dataset.length2;
        if (this.xArm) {
            this.extensionLength1 = this.dataset.extensionLength1;
            this.extensionLength2 = this.dataset.extensionLength2;
        }
        this.flip = this.dataset.flip === "true";
        this.innerHTML = this.xArm ? "<span>X-arm</span>" : "<span>V-arm</span>";
        this.innerHTML += `<label for="length1">Length 1</label><input type="number" id="length1" value="${this.length1}">`;
        this.innerHTML += `<label for="length2">Length 2</label><input type="number" id="length2" value="${this.length2}">`;
        if (this.xArm) {
            this.innerHTML += `<label for="extensionLength1">Ext length 1</label><input type="number" id="extensionLength1" value="${this.extensionLength1}">`;
            this.innerHTML += `<label for="extensionLength2">Ext length 2</label><input type="number" id="extensionLength2" value="${this.extensionLength2}">`;
        }
        this.innerHTML += `<label for="flip" class="right">Flip</label><input type="checkbox" id="flip" class="right" ${this.flip ? "checked" : ""}>`;
    
    }

    getData() {
        if (this.xArm) {
            return {
                length1: parseInt(this.querySelector("#length1").value),
                length2: parseInt(this.querySelector("#length2").value),
                extensionLength1: parseInt(this.querySelector("#extensionLength1").value),
                extensionLength2: parseInt(this.querySelector("#extensionLength2").value),
                flip: this.querySelector("#flip").checked
            };
        } else {
            return {
                length1: parseInt(this.querySelector("#length1").value),
                length2: parseInt(this.querySelector("#length2").value),
                flip: this.querySelector("#flip").checked
            };
        }
    }
    
}

customElements.define("arm-input", ArmInput);