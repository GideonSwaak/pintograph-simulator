import { RotaryPintograph } from "../../drawers/rotary-pintograph.js";
import "./input-components/mount-point.js";
import "./input-components/simple-wheel.js";
import "./input-components/arm-input.js";

/*
    mountPoint = { x: 250, y: 250 };
    baseWheel1 = { radius: 200, startAngle: 0, speed: 0.201 };
    baseWheel2 = { radius: 200, startAngle: Math.PI / 6, speed: 0.201 };
    wheel1 = { radius: 20, startAngle: -Math.PI, speed: 6 };
    wheel2 = { radius: 40, startAngle: 0, speed: 2 };
    armLength1 = 80;
    armLength2 = 100;
    flip = true;
    penColor = '#000';
    penSize = 1;
    shadowBlur = 0;
    shadowColor = '#000';
*/

const defaults = {
    mountPoint: { x: 250, y: 250 },
    baseWheel1: { radius: 200, startAngle: 0, speed: 0.201 },
    baseWheel2: { radius: 200, startAngle: Math.PI / 6, speed: 0.201 },
    wheel1: { radius: 20, startAngle: -Math.PI, speed: 6 },
    wheel2: { radius: 40, startAngle: 0, speed: 2 },
    armLength1: 80,
    armLength2: 100,
    flip: true,
    penSettings: {
        color: "black",
        size: 1,
        shadowBlur: 0,
        shadowColor: "black"
    }
};

export class RotaryPintographElement extends HTMLElement {
    data = defaults;

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
        <pen-settings data-size="${this.data.penSettings.size}" data-color="${this.data.penSettings.color}"></pen-settings>
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
        this.querySelector(".title-bar").addEventListener("click", event => {
            this.classList.toggle("expanded");
        });
        this.elements.deleteButton.addEventListener("click", () => {
            this.remove();
        });
    }

    getPintograph() {
        const pinto = new RotaryPintograph();
        const mountPoint = this.elements.mountPoint;
        pinto.setMountPoint(mountPoint.x, mountPoint.y);
        const baseWheel1 = this.elements.baseWheel1.getData();
        const baseWheel2 = this.elements.baseWheel2.getData();
        pinto.setBaseWheel1(baseWheel1.radius, baseWheel1.startAngle, baseWheel1.speed);
        pinto.setBaseWheel2(baseWheel2.radius, baseWheel2.startAngle, baseWheel2.speed);
        const wheel1 = this.elements.wheel1.getData();
        const wheel2 = this.elements.wheel2.getData();
        pinto.setWheel1(wheel1.radius, wheel1.startAngle, wheel1.speed);
        pinto.setWheel2(wheel2.radius, wheel2.startAngle, wheel2.speed);
        const armInput = this.elements.armInput.getData();
        pinto.setArmLength1(armInput.length1);
        pinto.setArmLength2(armInput.length2);
        pinto.setFlip(armInput.flip);
        pinto.setPenSettings(this.elements.penSettings.penSize, this.elements.penSettings.penColor, this.elements.penSettings.shadowBlur, this.elements.penSettings.shadowColor);
        return pinto;
    }
}

customElements.define("rotary-pintograph", RotaryPintographElement);