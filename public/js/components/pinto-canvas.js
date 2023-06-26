import { Scene } from "../libraries/pintograph.js";

class PintoCanvas extends HTMLElement {
    previewCanvas;
    toolCanvas;
    scene;
    customDrawers = [];
    paused = true;
    adaptToDevicePixelRatio = true;
    connectedCallback() {
        let height = this.getAttribute("height") || 0.9 * this.clientHeight;
        let width = this.getAttribute("width") || 0.9 * this.clientWidth;
        if (this.adaptToDevicePixelRatio) {
            height *= window.devicePixelRatio;
            width *= window.devicePixelRatio;
        }
        this.innerHTML = `
        <canvas id="pinto-canvas" height="${height}" width="${width}" class="preview"></canvas>
        <canvas id="pinto-canvas" height="${height}" width="${width}" class="tools"></canvas>
        <canvas id="pinto-canvas" height="${height}" width="${width}" class="overlay"></canvas>
        `;
        this.previewCanvas = this.querySelector(".preview");
        this.toolCanvas = this.querySelector(".tools");
        if (this.parentElement.tagName === "MAIN") {
            this.setListeners();
            const backgroundColor = document.querySelector("input[name='canvas-color']").value;
            this.previewCanvas.style.backgroundColor = backgroundColor;
        }
    }

    setListeners() {
        window.addEventListener("resize", () => {
            let height = 0.9 * this.clientHeight;
            let width =  0.9 * this.clientWidth;
            if (this.adaptToDevicePixelRatio) {
                height *= window.devicePixelRatio;
                width *= window.devicePixelRatio;
            }
            this.querySelectorAll("canvas").forEach(canvas => {
                canvas.height = height;
                canvas.width = width;
            });
        });
    }

    

    setPintographScene(func) {
        const scene = new Scene(this.previewCanvas.getContext("2d"), this.toolCanvas.getContext("2d"));
        func(scene);
        this.scene = scene;
    }

    addCustomDrawer(customDrawer) {
        customDrawer.setContext(this.previewCanvas.getContext("2d"));
        this.customDrawers.push(customDrawer);
    }

    customLoop() {
        if (this.paused) return;
        this.customDrawers.forEach(drawer => drawer.draw());
        window.requestAnimationFrame(this.customLoop.bind(this));
    }

    run() {
        this.paused = false;
        setTimeout(() => this.scene?.run());
        window.requestAnimationFrame(this.customLoop.bind(this));
    }

    pause() {
        this.scene?.pause();
        this.paused = true;
    }

    replace() {
        this.scene?.reset();
        const newPintoCanvas = document.createElement("pinto-canvas");
        this.parentElement.replaceChild(newPintoCanvas, this);
        return newPintoCanvas;
    }
}

customElements.define("pinto-canvas", PintoCanvas);