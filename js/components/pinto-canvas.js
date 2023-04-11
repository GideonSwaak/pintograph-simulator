import { Scene } from "../libraries/pintograph.js";

class PintoCanvas extends HTMLElement {
    previewCanvas;
    toolCanvas;
    scene;
    connectedCallback() {
        let height = this.getAttribute("height") || 0.9 * this.clientHeight;
        let width = this.getAttribute("width") || 0.9 * this.clientWidth;
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
            this.querySelectorAll("canvas").forEach(canvas => {
                canvas.height = height;
                canvas.width = width;
            });
        });
    }

    initiateScene(func) {
        const scene = new Scene(this.previewCanvas.getContext("2d"), this.toolCanvas.getContext("2d"));
        func(scene);
        this.scene = scene;
        setTimeout(() => scene.run());
    }

    killScene() {
        this.scene?.reset();
        this.scene = null;
    }
}

customElements.define("pinto-canvas", PintoCanvas);