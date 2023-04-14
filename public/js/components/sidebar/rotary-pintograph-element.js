import { RotaryPintograph, defaults } from "../../drawers/pintographs/rotary-pintograph.js";
import "./input-components/mount-point.js";
import "./input-components/simple-wheel.js";
import "./input-components/arm-input.js";

export class RotaryPintographElement extends HTMLElement {
    data = defaults();

    connectedCallback() {
        this.classList.add("pinto-element", "expanded");
        this.innerHTML = `
        <div class="title-bar">Rotary pintograph <button class='delete'>Delete</button></div>
        <mount-point data-point="1" data-x="${this.data.mountPoint.x}" data-y="${this.data.mountPoint.y}"></mount-point>
        <simple-wheel data-point="1" data-radius="${this.data.baseWheel1.radius}" data-start-angle="${this.data.baseWheel1.startAngle}" data-speed="${this.data.baseWheel1.speed}"></simple-wheel>
        <simple-wheel data-point="2" data-radius="${this.data.baseWheel2.radius}" data-start-angle="${this.data.baseWheel2.startAngle}" data-speed="${this.data.baseWheel2.speed}"></simple-wheel>
        <simple-wheel data-point="3" data-radius="${this.data.wheel1.radius}" data-start-angle="${this.data.wheel1.startAngle}" data-speed="${this.data.wheel1.speed}"></simple-wheel>
        <simple-wheel data-point="4" data-radius="${this.data.wheel2.radius}" data-start-angle="${this.data.wheel2.startAngle}" data-speed="${this.data.wheel2.speed}"></simple-wheel>
        <arm-input data-point="2" data-length1="${this.data.armLength1}" data-length2="${this.data.armLength2}" data-flip="${this.data.flip}"></arm-input>
        <pen-settings data-size="${this.data.penSettings.size}" data-color="${this.data.penSettings.color}" data-shadow-blur="${this.data.penSettings.shadowBlur}" data-shadow-color="${this.data.penSettings.shadowColor}" data-rainbow-shadow-color="${this.data.penSettings.rainbowShadowColor}" data-rainbow-color="${this.data.penSettings.rainbowColor}"></pen-settings>
        `;
        this.elements = {
            deleteButton: this.querySelector(".delete"),
            mountPoint: this.querySelector("mount-point"),
            baseWheel1: this.querySelector("simple-wheel[data-point='1']"),
            baseWheel2: this.querySelector("simple-wheel[data-point='2']"),
            wheel1: this.querySelector("simple-wheel[data-point='3']"),
            wheel2: this.querySelector("simple-wheel[data-point='4']"),
            armInput: this.querySelector("arm-input"),
            penSettings: this.querySelector("pen-settings")
        };
        this.querySelector(".title-bar").addEventListener("click", () => this.classList.toggle("expanded"));
        this.elements.deleteButton.addEventListener("click", this.remove.bind(this));
    }

    getPintograph() {
        return new RotaryPintograph(this.getData());
    }

    getData() {
        return {
            mountPoint: this.elements.mountPoint.getData(),
            baseWheel1: this.elements.baseWheel1.getData(),
            baseWheel2: this.elements.baseWheel2.getData(),
            wheel1: this.elements.wheel1.getData(),
            wheel2: this.elements.wheel2.getData(),
            armLength1: this.elements.armInput.getData().length1,
            armLength2: this.elements.armInput.getData().length2,
            flip: this.elements.armInput.getData().flip,
            penSettings: this.elements.penSettings.getData(),
            type: "rotary-pintograph"
        }
    }
    
}

customElements.define("rotary-pintograph", RotaryPintographElement);