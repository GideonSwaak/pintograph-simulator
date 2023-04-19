import { LissajousCurves, defaults } from "../../../drawers/pintographs/lissajous-curves.js";

import "../input-components/mount-point.js";
import "../input-components/oscillator-input.js";

export class LissajousCurvesElement extends HTMLElement {
    data = defaults();
    elements;

    connectedCallback() {
        this.classList.add("pinto-element", "expanded");
        this.innerHTML = `
        <div class="title-bar">Lissajous curves <button class='delete'>Delete</button></div>
        <mount-point data-x="${this.data.mountPoint.x}" data-y="${this.data.mountPoint.y}"></mount-point>
        <oscillator-input data-length="${this.data.hOscillator.length}" data-angle="${this.data.hOscillator.angle}" data-speed="${this.data.hOscillator.speed}" h-oscillator></oscillator-input>
        <oscillator-input data-length="${this.data.vOscillator.length}" data-angle="${this.data.vOscillator.angle}" data-speed="${this.data.vOscillator.speed}" v-oscillator></oscillator-input>
        <pen-settings data-size="${this.data.penSettings.size}" data-color="${this.data.penSettings.color}" data-shadow-blur="${this.data.penSettings.shadowBlur}" data-shadow-color="${this.data.penSettings.shadowColor}" data-rainbow-shadow-color="${this.data.penSettings.rainbowShadowColor}" data-rainbow-color="${this.data.penSettings.rainbowColor}" data-tool-color="${this.data.penSettings.toolColor}"></pen-settings>
        `;

        this.elements = {
            deleteButton: this.querySelector("button.delete"),
            mountPoint: this.querySelector("mount-point"),
            hOscillator: this.querySelector("oscillator-input[h-oscillator]"),
            vOscillator: this.querySelector("oscillator-input[v-oscillator]"),
            penSettings: this.querySelector("pen-settings")
        };
        
        this.querySelector(".title-bar").addEventListener("click", () => this.classList.toggle("expanded"));

        this.elements.deleteButton.addEventListener("click", this.remove.bind(this));
    }

    getPintograph() {
        const lissajous = new LissajousCurves(this.getData());
        return lissajous;
    }

    getData() {
        return {
            mountPoint: this.elements.mountPoint.getData(),
            hOscillator: this.elements.hOscillator.getData(),
            vOscillator: this.elements.vOscillator.getData(),
            penSettings: this.elements.penSettings.getData(),
            type: "lissajous-curves"
        }
    }
}

customElements.define("lissajous-curves", LissajousCurvesElement);