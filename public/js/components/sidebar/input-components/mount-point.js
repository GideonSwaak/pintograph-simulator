import { getForegroundTextColor } from "../../../utilities.js";

class MountPoint extends HTMLElement {
    clickListener;
    hoverListener;

    connectedCallback() {
        this.innerHTML = `
        <span>Mount point ${this.dataset.point || ""}</span>
        <span><input type="number" name="x" class="x" value="${this.dataset.x}"></span>
        <span><input type="number" name="y" class="y" value="${this.dataset.y}"></span>
        <button class="mount-point-picker">Kiezen</button>
        `;
        this.elements = {
            x: this.querySelector(".x"),
            y: this.querySelector(".y"),
            pointPicker: this.querySelector(".mount-point-picker"),
        }
        this.setupListeners();
    }

    setupListeners() {
        this.elements.pointPicker.addEventListener("click", e => {
            if (this.clickListener !== undefined) return;
            const pintoCanvas = document.querySelector("main pinto-canvas");
            this.clickListener = this.pointPickerClickEvent.bind(this);
            pintoCanvas.addEventListener("click", this.clickListener);
            pintoCanvas.addEventListener("mousemove", this.mountPointHoverListener);
        });
    }

    pointPickerClickEvent(event) {
        const pintoCanvas = document.querySelector("main pinto-canvas");
        pintoCanvas.removeEventListener("click", this.clickListener)
        pintoCanvas.removeEventListener("mousemove", this.mountPointHoverListener);
        this.elements.x.value = event.offsetX;
        this.elements.y.value = event.offsetY;
        const overlay = pintoCanvas.querySelector(".overlay");
        setTimeout(() => overlay.getContext("2d").clearRect(0, 0, overlay.width, overlay.height));
        this.clickListener = undefined;
    }

    mountPointHoverListener(event) {
        const overlay = document.querySelector("main pinto-canvas .overlay");
        overlay.getContext("2d").clearRect(0, 0, overlay.width, overlay.height);
        overlay.getContext("2d").beginPath();
        overlay.getContext("2d").strokeStyle = getForegroundTextColor(document.querySelector("pinto-canvas canvas:first-child").style.backgroundColor);
        overlay.getContext("2d").arc(event.offsetX, event.offsetY, 5, 0, 2 * Math.PI);
        overlay.getContext("2d").stroke();
    }

    getData() {
        return {
            x: this.elements.x.valueAsNumber,
            y: this.elements.y.valueAsNumber,
        };
    }

}

customElements.define("mount-point", MountPoint);