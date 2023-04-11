import { SimplePintograph } from "../../drawers/simple-pintograph.js";
import { ProperPintograph } from "../../drawers/proper-pintograph.js";
import { LissajousCurves } from "../../drawers/lissajous-curves.js";
import { RotaryPintograph } from "../../drawers/rotary-pintograph.js";

class NewPintoDialog extends HTMLDialogElement {
    sidebarElements = document.querySelector("#sidebar > .elements");
    simplePintographExample;
    properPintographExample;
    lissajousCurvesExample;
    rotaryPintographExample;

    connectedCallback() {
        this.setup();
        this.querySelector(".close-button").addEventListener("click", this.close.bind(this));
    }
    
    setup() {
        this.querySelector(".content").innerHTML = `
        <div class="element" class="new-simple-pintograph"><pinto-canvas data-name="Simple pintograph" class="example" id="simple-pintograph-example" height="150" width="150"></pinto-canvas></div>
        <div class="element" class="new-proper-pintograph"><pinto-canvas data-name="Proper pintograph" class="example" id="proper-pintograph-example" height="150" width="150"></pinto-canvas></div>
        <div class="element" class="new-rotary-pintograph"><pinto-canvas data-name="Rotary pintograph" class="example" id="rotary-pintograph-example" height="150" width="150"></pinto-canvas></div>
        <div class="element" class="new-lissajous-curves"><pinto-canvas data-name="Lissajous" class="example" id="lissajous-curves-example" height="150" width="150"></pinto-canvas></div>
        `;
        this.simplePintographExample = this.querySelector("#simple-pintograph-example");
        this.properPintographExample = this.querySelector("#proper-pintograph-example");
        this.lissajousCurvesExample = this.querySelector("#lissajous-curves-example");
        this.rotaryPintographExample = this.querySelector("#rotary-pintograph-example");
        
        this.simplePintographExample.addEventListener("click", this.addElement.bind(this, "simple-pintograph"));
        this.properPintographExample.addEventListener("click", this.addElement.bind(this, "proper-pintograph"));
        this.lissajousCurvesExample.addEventListener("click", this.addElement.bind(this, "lissajous-curves"));
        this.rotaryPintographExample.addEventListener("click", this.addElement.bind(this, "rotary-pintograph"));
    }

    addElement(elementType) {
        this.sidebarElements.appendChild(document.createElement(elementType));
        this.close();
    }

    showModal() {
        super.showModal();
        this.setup();
        this.querySelector("#simple-pintograph-example").initiateScene(scene => {
            const simplePintograph = new SimplePintograph();
            simplePintograph.scale(6);
            simplePintograph.build(scene);
        });
        this.querySelector("#proper-pintograph-example").initiateScene(scene => {
            const properPintograph = new ProperPintograph();
            properPintograph.scale(6);
            properPintograph.build(scene);
        });
        this.querySelector("#lissajous-curves-example").initiateScene(scene => {
            const lissajousCurves = new LissajousCurves();
            lissajousCurves.scale(6);
            lissajousCurves.build(scene);
        });
        this.querySelector("#rotary-pintograph-example").initiateScene(scene => {
            const rotaryPintograph = new RotaryPintograph();
            rotaryPintograph.scale(6);
            rotaryPintograph.build(scene);
        });
        this.querySelectorAll("canvas").forEach(canvas => canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height));
    }

    close() {
        super.close();
        this.querySelectorAll(".content > pinto-canvas").forEach(canvas => canvas.remove());
    }

}

customElements.define("new-pinto-dialog", NewPintoDialog, { extends: "dialog" });