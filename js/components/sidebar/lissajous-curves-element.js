import { LissajousCurves } from "../../drawers/lissajous-curves.js";

import "./input-components/mount-point.js";
import "./input-components/oscillator-input.js";

export const defaults = {
    mountPoint: { x: 400, y: 300 },
    hOscillator: {
        length: 500,
        angle: 0,
        speed: 0.6
    },
    vOscillator: {
        length: 500,
        angle: -Math.PI / 2,
        speed: 0.5
    },
    penSettings: {
        color: "black",
        size: 1,
        shadowBlur: 0,
        shadowColor: "black"
    }
};

export class LissajousCurvesElement extends HTMLElement {
    data = defaults;
    elements;
    connectedCallback() {
        this.classList.add("pinto-element", "expanded");
        this.innerHTML = `
        <div class="title-bar">Lissajous curves <button class='delete'>Delete</button></div>
        <mount-point data-x="${this.data.mountPoint.x}" data-y="${this.data.mountPoint.y}"></mount-point>
        <oscillator-input data-length="${this.data.hOscillator.length}" data-angle="${this.data.hOscillator.angle}" data-speed="${this.data.hOscillator.speed}" h-oscillator></oscillator-input>
        <oscillator-input data-length="${this.data.vOscillator.length}" data-angle="${this.data.vOscillator.angle}" data-speed="${this.data.vOscillator.speed}" v-oscillator></oscillator-input>
        <pen-settings data-size="${this.data.penSettings.size}" data-color="${this.data.penSettings.color}"></pen-settings>
        `;
        this.elements = {
            deleteButton: this.querySelector("button.delete"),
            mountPoint: this.querySelector("mount-point"),
            hOscillator: this.querySelector("oscillator-input[h-oscillator]"),
            vOscillator: this.querySelector("oscillator-input[v-oscillator]"),
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
        const lissajous = new LissajousCurves();
        lissajous.setMountPoint(this.elements.mountPoint.x, this.elements.mountPoint.y);
        lissajous.setHOscillator(this.elements.hOscillator.length, this.elements.hOscillator.angle, this.elements.hOscillator.speed);
        lissajous.setVOscillator(this.elements.vOscillator.length, this.elements.vOscillator.angle, this.elements.vOscillator.speed);
        lissajous.setPenSettings(this.elements.penSettings.penSize, this.elements.penSettings.penColor, this.elements.penSettings.shadowBlur, this.elements.penSettings.shadowColor);
        return lissajous;
    }
}

customElements.define("lissajous-curves", LissajousCurvesElement);