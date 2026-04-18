import { Scene, WebGLRenderer } from "../../pintograph/dist/index.js";

class PintoCanvas extends HTMLElement {
    previewCanvas;
    toolCanvas;
    scene;
    renderer;
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
            this.renderer?.resize(this.previewCanvas.width, this.previewCanvas.height);
        });
    }

    setPintographScene(func) {
        // preserveDrawingBuffer keeps the screenshot button working (Canvas.drawImage
        // on a WebGL canvas reads back the latest framebuffer, which is cleared on
        // composite by default).
        const gl = this.previewCanvas.getContext("webgl2", {
            preserveDrawingBuffer: true,
            antialias: true,
            premultipliedAlpha: false,
        });
        if (!gl) {
            throw new Error("WebGL2 is not available in this browser.");
        }
        gl.viewport(0, 0, this.previewCanvas.width, this.previewCanvas.height);
        const renderer = new WebGLRenderer(gl);
        const scene = new Scene();
        scene.setRenderer(renderer);
        func(scene, renderer);
        this.scene = scene;
        this.renderer = renderer;
    }

    addCustomDrawer(customDrawer) {
        // Custom drawers expect a 2D context; with the preview canvas now on WebGL2
        // they would conflict. Custom drawers are not currently wired into the UI;
        // route them to the (otherwise unused) tool canvas so this remains a safe no-op.
        customDrawer.setContext(this.toolCanvas.getContext("2d"));
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
        this.scene?.stop();
        this.paused = true;
    }

    /**
     * Set the simulation speed multiplier. Speeds up the running scene
     * without modifying any drawer parameters: timeScale is the wall-clock
     * <-> simulation time ratio, stepsPerFrame is bumped proportionally so
     * the trace stays dense at high speeds.
     */
    setSpeed(multiplier) {
        if (!this.scene) return;
        this.scene.timeScale = multiplier;
        // Cap per-frame work; ~200 steps/frame keeps the budget under ~2ms of CPU
        // even in the worst-case scene.
        this.scene.stepsPerFrame = Math.min(200, Math.max(10, Math.round(10 * multiplier)));
    }

    setDebugEnabled(enabled) {
        this.renderer?.setDebugEnabled(enabled);
    }

    replace() {
        this.scene?.reset();
        const newPintoCanvas = document.createElement("pinto-canvas");
        this.parentElement.replaceChild(newPintoCanvas, this);
        return newPintoCanvas;
    }
}

customElements.define("pinto-canvas", PintoCanvas);