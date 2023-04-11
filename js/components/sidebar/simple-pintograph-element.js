import { SimplePintograph } from "../../drawers/simple-pintograph.js";
import "./input-components/mount-point.js";
import "./input-components/simple-wheel.js";
import "./input-components/arm-input.js";
import "./input-components/pen-settings.js";

const defaults = {
    mountPoint1: { x: 200, y: 450 },
    mountPoint2: { x: 600, y: 450 },
    wheel1: {
        radius: 150,
        startAngle: 0,
        speed: 0.5
    },
    wheel2: {
        radius: 100,
        startAngle: -Math.PI / 2,
        speed: 0.51
    },
    armLength1: 300,
    armLength2: 350,
    flip: false,
    penSettings: {
        color: "black",
        size: 1
    }
}

export class SimplePintographElement extends HTMLElement {

    elements = {};
    data = defaults;
    constructor() {
        super();
    }

    connectedCallback() {
        this.classList.add("pinto-element", "expanded");
        this.innerHTML = `
            <div class="title-bar">Simple pintograph <button class='delete'>Delete</button></div>
            <mount-point data-point="1" data-x="${this.data.mountPoint1.x}" data-y="${this.data.mountPoint1.y}"></mount-point>
            <mount-point data-point="2" data-x="${this.data.mountPoint2.x}" data-y="${this.data.mountPoint2.y}"></mount-point>
            <simple-wheel data-point="1" data-radius="${this.data.wheel1.radius}" data-start-angle="${this.data.wheel1.startAngle}" data-speed="${this.data.wheel1.speed}"></simple-wheel>
            <simple-wheel data-point="2" data-radius="${this.data.wheel2.radius}" data-start-angle="${this.data.wheel2.startAngle}" data-speed="${this.data.wheel2.speed}"></simple-wheel>
            <arm-input data-length1="${this.data.armLength1}" data-length2="${this.data.armLength2}" data-flip="${this.data.flip}"></arm-input>
            <pen-settings data-size="${this.data.penSettings.size}" data-color="${this.data.penSettings.color}"></pen-settings>
        `;

        this.elements.deleteButton = this.querySelector("button.delete");
        this.elements.deleteButton.addEventListener("click", () => {
            this.remove();
        });
        this.querySelector(".title-bar").addEventListener("click", event => {
            this.classList.toggle("expanded");
        });
        this.elements.mountPoint1 = this.querySelector("mount-point[data-point='1']");
        this.elements.mountPoint2 = this.querySelector("mount-point[data-point='2']");
        this.elements.wheel1 = this.querySelector("simple-wheel[data-point='1']");
        this.elements.wheel2 = this.querySelector("simple-wheel[data-point='2']");
        this.elements.armInput = this.querySelector("arm-input");
        this.elements.penSettings = this.querySelector("pen-settings");
    }


    getPintograph() {
        const pinto = new SimplePintograph();
        const mountPoint1 = this.elements.mountPoint1;
        const mountPoint2 = this.elements.mountPoint2;
        pinto.setMountPoints(mountPoint1.x, mountPoint1.y, mountPoint2.x, mountPoint2.y);
        const wheel1 = this.elements.wheel1.getData();
        const wheel2 = this.elements.wheel2.getData();
        pinto.setWheel1(wheel1.radius, wheel1.startAngle, wheel1.speed);
        pinto.setWheel2(wheel2.radius, wheel2.startAngle, wheel2.speed);
        const armData = this.elements.armInput.getData();
        pinto.setArmLengths(armData.length1, armData.length2);
        pinto.setFlip(armData.flip);
        pinto.setPenSettings(this.elements.penSettings.penSize, this.elements.penSettings.penColor, this.elements.penSettings.shadowBlur, this.elements.penSettings.shadowColor);
        return pinto;
    }

    getData() {
        const mountPoint1 = this.elements.mountPoint1.getData();
        const mountPoint2 = this.elements.mountPoint2.getData();
        const wheel1 = this.elements.wheel1.getData();
        const wheel2 = this.elements.wheel2.getData();
        const armLength1 = this.elements.armLength1.value;
        const armLength2 = this.elements.armLength2.value;
        const flip = this.elements.flip.checked;
        return {
            mountPoint1,
            mountPoint2,
            wheel1,
            wheel2,
            armLength1,
            armLength2,
            flip
        };
    }

    static loadFromData(data) {
        const element = document.createElement("simple-pintograph");
        element.data = data;
        return element;
    }
    
}

customElements.define("simple-pintograph", SimplePintographElement);