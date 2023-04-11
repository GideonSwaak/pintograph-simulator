import { ProperPintograph } from "../../drawers/proper-pintograph.js";
import "./input-components/mount-point.js";
import "./input-components/simple-wheel.js";
import "./input-components/arm-input.js";

const defaults = {
    mountPoint1: { x: 250, y: 500 },
    mountPoint2: { x: 550, y: 500 },
    wheel1: {
        radius: 80,
        startAngle: 0,
        speed: -0.303
    },
    subwheel1: {
        radius: 20,
        startAngle: 0,
        speed: 0.909
    },
    wheel2: {
        radius: 100,
        startAngle: -Math.PI / 2,
        speed: 0.3
    },
    subwheel2: {
        radius: 30,
        startAngle: Math.PI,
        speed: -0.9
    },
    xArm: {
        length1: 250,
        length2: 250,
        extensionLength1: 60,
        extensionLength2: 60,
        flip: false
    },
    vArm: {
        length1: 60,
        length2: 60,
        flip: true
    },
    penSettings: {
        color: "black",
        size: 1,
        shadowBlur: 0,
        shadowColor: "black"
    }
}

export class ProperPintographElement extends HTMLElement {
    data = defaults;

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
        <pen-settings data-size="${this.data.penSettings.size}" data-color="${this.data.penSettings.color}"></pen-settings>
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
        this.querySelector(".title-bar").addEventListener("click", event => {
            this.classList.toggle("expanded");
        });
        this.elements.deleteButton.addEventListener("click", () => {
            this.remove();
        });
    }

    getPintograph() {
        const pinto = new ProperPintograph();
        const mountPoint1 = this.elements.mountPoint1;
        const mountPoint2 = this.elements.mountPoint2;
        pinto.setMountPoints(mountPoint1.x, mountPoint1.y, mountPoint2.x, mountPoint2.y);
        const wheel1 = this.elements.wheel1.getData();
        const wheel2 = this.elements.wheel2.getData();
        pinto.setWheel1(wheel1.radius, wheel1.startAngle, wheel1.speed);
        pinto.setWheel2(wheel2.radius, wheel2.startAngle, wheel2.speed);
        const subwheel1 = this.elements.subwheel1.getData();
        const subwheel2 = this.elements.subwheel2.getData();
        pinto.setSubwheel1(subwheel1.radius, subwheel1.startAngle, subwheel1.speed);
        pinto.setSubwheel2(subwheel2.radius, subwheel2.startAngle, subwheel2.speed);
        const xArmData = this.elements.xArm.getData();
        pinto.setXArm(xArmData.length1, xArmData.extensionLength1, xArmData.length2, xArmData.extensionLength2, xArmData.flip);
        const vArmData = this.elements.vArm.getData();
        pinto.setVArm(vArmData.length1, vArmData.length2, vArmData.flip);
        pinto.setPenSettings(this.elements.penSettings.penSize, this.elements.penSettings.penColor, this.elements.penSettings.shadowBlur, this.elements.penSettings.shadowColor);
        return pinto;
    }

    
}

customElements.define('proper-pintograph', ProperPintographElement);