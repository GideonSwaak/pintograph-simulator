import { SimplePintograph, defaults } from "../../../drawers/pintographs/simple-pintograph.js";
import "../input-components/mount-point.js";
import "../input-components/simple-wheel.js";
import "../input-components/arm-input.js";
import "../input-components/pen-settings.js";


export class SimplePintographElement extends HTMLElement {

    elements = {};
    data = defaults();

    connectedCallback() {
        this.classList.add("pinto-element", "expanded");
        this.innerHTML = `
            <div class="title-bar">Simple pintograph <button class='delete'>Delete</button></div>
            <mount-point data-point="1" data-x="${this.data.mountPoint1.x}" data-y="${this.data.mountPoint1.y}"></mount-point>
            <mount-point data-point="2" data-x="${this.data.mountPoint2.x}" data-y="${this.data.mountPoint2.y}"></mount-point>
            <simple-wheel data-point="1" data-radius="${this.data.wheel1.radius}" data-start-angle="${this.data.wheel1.startAngle}" data-speed="${this.data.wheel1.speed}"></simple-wheel>
            <simple-wheel data-point="2" data-radius="${this.data.wheel2.radius}" data-start-angle="${this.data.wheel2.startAngle}" data-speed="${this.data.wheel2.speed}"></simple-wheel>
            <arm-input data-length1="${this.data.armLength1}" data-length2="${this.data.armLength2}" data-flip="${this.data.flip}"></arm-input>
            <pen-settings data-size="${this.data.penSettings.size}" data-color="${this.data.penSettings.color}" data-shadow-blur="${this.data.penSettings.shadowBlur}" data-shadow-color="${this.data.penSettings.shadowColor}" data-rainbow-shadow-color="${this.data.penSettings.rainbowShadowColor}" data-rainbow-color="${this.data.penSettings.rainbowColor}" data-tool-color="${this.data.penSettings.toolColor}"></pen-settings>
            `;
        this.elements = {
            deleteButton: this.querySelector("button.delete"),
            mountPoint1: this.querySelector("mount-point[data-point='1']"),
            mountPoint2: this.querySelector("mount-point[data-point='2']"),
            wheel1: this.querySelector("simple-wheel[data-point='1']"),
            wheel2: this.querySelector("simple-wheel[data-point='2']"),
            armInput: this.querySelector("arm-input"),
            penSettings: this.querySelector("pen-settings")
        }
        this.elements.deleteButton.addEventListener("click", this.remove.bind(this));
        this.querySelector(".title-bar").addEventListener("click", () => this.classList.toggle("expanded"));
    }

    getPintograph() {
        return new SimplePintograph(this.getData());
    }

    getData() {
        return {
            mountPoint1: this.elements.mountPoint1.getData(),
            mountPoint2: this.elements.mountPoint2.getData(),
            wheel1: this.elements.wheel1.getData(),
            wheel2: this.elements.wheel2.getData(),
            armLength1: this.elements.armInput.getData().length1,
            armLength2: this.elements.armInput.getData().length2,
            flip: this.elements.armInput.getData().flip,
            penSettings: this.elements.penSettings.getData(),
            type: "simple-pintograph"
        }
    }
    
}

customElements.define("simple-pintograph", SimplePintographElement);