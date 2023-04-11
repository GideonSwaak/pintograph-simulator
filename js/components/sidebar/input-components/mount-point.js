import { getForegroundTextColor } from "../../../utilities.js";

class MountPoint extends HTMLElement {
    xEl;
    yEl;
    button;
    x = 200;
    y = 200;
    clickListener;
    hoverListener;

    connectedCallback() {
        let point = this.dataset.point;
        this.x = this.dataset.x;
        this.y = this.dataset.y;
        this.innerHTML = `
        <span>Mount point ${point || ""}</span><br>
        <label for="x">X</label>
        <input type="number" name="x" class="x" value="${this.dataset.x}">
        <label for="y">Y</label>
        <input type="number" name="y" class="y" value="${this.dataset.y}">
        <button>Kiezen</button>
        `;
        this.xEl = this.querySelector(".x");
        this.yEl = this.querySelector(".y");
        this.button = this.querySelector("button");
        this.setupListeners();
    }

    setupListeners() {
        this.xEl.addEventListener("change", e => this.x = parseInt(e.target.value));
        this.yEl.addEventListener("change", e => this.y = parseInt(e.target.value));
        this.button.addEventListener("click", e => {
            if (this.clickListener !== undefined) return;
            this.clickListener = this.mountPointPicker.bind(this);
            document.querySelector("pinto-canvas").addEventListener("click", this.clickListener);
            document.querySelector("pinto-canvas").addEventListener("mousemove", this.mountPointHoverListener);
        });
    }

    mountPointPicker(event) {
        document.querySelector("pinto-canvas").removeEventListener("click", this.clickListener)
        document.querySelector("pinto-canvas").removeEventListener("mousemove", this.mountPointHoverListener);
        this.xEl.value = this.x = event.offsetX;
        this.yEl.value = this.y = event.offsetY;
        const overlay = document.querySelector("pinto-canvas").querySelector(".overlay");
        setTimeout(() => overlay.getContext("2d").clearRect(0, 0, overlay.width, overlay.height));
        this.clickListener = undefined;
    }

    mountPointHoverListener(event) {
        const overlay = document.querySelector("pinto-canvas").querySelector(".overlay");
        overlay.getContext("2d").clearRect(0, 0, overlay.width, overlay.height);
        overlay.getContext("2d").beginPath();
        overlay.getContext("2d").strokeStyle = getForegroundTextColor(document.querySelector("pinto-canvas canvas:first-child").style.backgroundColor);
        overlay.getContext("2d").arc(event.offsetX, event.offsetY, 5, 0, 2 * Math.PI);
        overlay.getContext("2d").stroke();
        
    }

}

customElements.define("mount-point", MountPoint);