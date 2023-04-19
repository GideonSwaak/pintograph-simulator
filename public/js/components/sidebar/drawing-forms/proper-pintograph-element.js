import { ProperPintograph, defaults } from "../../../drawers/pintographs/proper-pintograph.js";
import "../input-components/mount-point.js";
import "../input-components/simple-wheel.js";
import "../input-components/arm-input.js";

export class ProperPintographElement extends HTMLElement {
    data = defaults();

    connectedCallback() {
        this.classList.add("pinto-element", "expanded");
        this.innerHTML = `
        <div class="title-bar">Proper pintograph <button class='delete'>Delete</button></div>
        <mount-point data-point="1" data-x="${this.data.mountPoint1.x}" data-y="${this.data.mountPoint1.y}"></mount-point>
        <mount-point data-point="2" data-x="${this.data.mountPoint2.x}" data-y="${this.data.mountPoint2.y}"></mount-point>
        <simple-wheel data-point="1" data-radius="${this.data.wheel1.radius}" data-start-angle="${this.data.wheel1.startAngle}" data-speed="${this.data.wheel1.speed}"></simple-wheel>
        <simple-wheel data-point="2" data-radius="${this.data.wheel2.radius}" data-start-angle="${this.data.wheel2.startAngle}" data-speed="${this.data.wheel2.speed}"></simple-wheel>
        <simple-wheel data-point="1" data-radius="${this.data.subwheel1.radius}" data-start-angle="${this.data.subwheel1.startAngle}" data-speed="${this.data.subwheel1.speed}" subwheel></simple-wheel>
        <simple-wheel data-point="2" data-radius="${this.data.subwheel2.radius}" data-start-angle="${this.data.subwheel2.startAngle}" data-speed="${this.data.subwheel2.speed}" subwheel></simple-wheel>
        <arm-input data-length1="${this.data.xArm.length1}" data-length2="${this.data.xArm.length2}" data-extension-length1="${this.data.xArm.extensionLength1}" data-extension-length2="${this.data.xArm.extensionLength2}" data-flip="${this.data.xArm.flip}" x-arm></arm-input>
        <arm-input data-length1="${this.data.vArm.length1}" data-length2="${this.data.vArm.length2}" data-flip="${this.data.vArm.flip}" v-arm></arm-input>
        <pen-settings data-size="${this.data.penSettings.size}" data-color="${this.data.penSettings.color}" data-shadow-blur="${this.data.penSettings.shadowBlur}" data-shadow-color="${this.data.penSettings.shadowColor}" data-rainbow-shadow-color="${this.data.penSettings.rainbowShadowColor}" data-rainbow-color="${this.data.penSettings.rainbowColor}" data-tool-color="${this.data.penSettings.toolColor}"></pen-settings>
        `;
        this.elements = {
            deleteButton: this.querySelector("button.delete"),
            mountPoint1: this.querySelector("mount-point[data-point='1']"),
            mountPoint2: this.querySelector("mount-point[data-point='2']"),
            wheel1: this.querySelector("simple-wheel[data-point='1']:not([subwheel])"),
            wheel2: this.querySelector("simple-wheel[data-point='2']:not([subwheel])"),
            subwheel1: this.querySelector("simple-wheel[data-point='1'][subwheel]"),
            subwheel2: this.querySelector("simple-wheel[data-point='2'][subwheel]"),
            xArm: this.querySelector("arm-input[x-arm]"),
            vArm: this.querySelector("arm-input:not([x-arm])"),
            penSettings: this.querySelector("pen-settings")
        };
        this.querySelector(".title-bar").addEventListener("click", () => this.classList.toggle("expanded"));
        this.elements.deleteButton.addEventListener("click", this.remove.bind(this));
    }

    getPintograph() {
        return new ProperPintograph(this.getData());
    }

    getData() {
        return {
            mountPoint1: this.elements.mountPoint1.getData(),
            mountPoint2: this.elements.mountPoint2.getData(),
            wheel1: this.elements.wheel1.getData(),
            wheel2: this.elements.wheel2.getData(),
            subwheel1: this.elements.subwheel1.getData(),
            subwheel2: this.elements.subwheel2.getData(),
            xArm: this.elements.xArm.getData(),
            vArm: this.elements.vArm.getData(),
            penSettings: this.elements.penSettings.getData(),
            type: "proper-pintograph"
        }
    }

}

customElements.define('proper-pintograph', ProperPintographElement);