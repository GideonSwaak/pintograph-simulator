import { SimplePintograph } from "../../drawers/pintographs/simple-pintograph.js";
import { ProperPintograph } from "../../drawers/pintographs/proper-pintograph.js";
import { LissajousCurves } from "../../drawers/pintographs/lissajous-curves.js";
import { RotaryPintograph } from "../../drawers/pintographs/rotary-pintograph.js";

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
        this.simplePintographExample.adaptToDevicePixelRatio = false;
        this.properPintographExample = this.querySelector("#proper-pintograph-example");
        this.properPintographExample.adaptToDevicePixelRatio = false;
        this.lissajousCurvesExample = this.querySelector("#lissajous-curves-example");
        this.lissajousCurvesExample.adaptToDevicePixelRatio = false;
        this.rotaryPintographExample = this.querySelector("#rotary-pintograph-example");
        this.rotaryPintographExample.adaptToDevicePixelRatio = false;
        
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
        this.querySelector("#simple-pintograph-example").setPintographScene(scene => {
            const simplePintograph = new SimplePintograph();
            simplePintograph.scale(6);
            simplePintograph.build(scene);
        });
        this.querySelector("#simple-pintograph-example").run();
        this.querySelector("#proper-pintograph-example").setPintographScene(scene => {
            const properPintograph = new ProperPintograph();
            properPintograph.scale(6);
            properPintograph.build(scene);
        });
        this.querySelector("#proper-pintograph-example").run();
        this.querySelector("#lissajous-curves-example").setPintographScene(scene => {
            const lissajousCurves = new LissajousCurves();
            lissajousCurves.scale(6);
            lissajousCurves.build(scene);
        });
        this.querySelector("#lissajous-curves-example").run();
        this.querySelector("#rotary-pintograph-example").setPintographScene(scene => {
            const rotaryPintograph = new RotaryPintograph();
            rotaryPintograph.scale(6);
            rotaryPintograph.build(scene);
        });
        this.querySelector("#rotary-pintograph-example").run();
        this.querySelectorAll("canvas").forEach(canvas => canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height));
    }

    close() {
        super.close();
        this.querySelectorAll(".content > pinto-canvas").forEach(canvas => canvas.remove());
    }

}

customElements.define("new-pinto-dialog", NewPintoDialog, { extends: "dialog" });