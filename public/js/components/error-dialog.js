class ErrorDialog extends HTMLDialogElement {

    connectedCallback() {
        window.addEventListener("error", this.errorHandler.bind(this));
        this.querySelector(".ok-button").addEventListener("click", this.close.bind(this));
        this.querySelector(".close-button").addEventListener("click", this.close.bind(this));
    }
    
    errorHandler(event) {
        if (!event.filename || !event.filename.includes("/pintograph/dist/")) return;
        document.querySelector("main pinto-canvas").replace();
        if (this.open) return;
        this.showModal();
        this.querySelector("p").innerHTML = `${event.message}`;
    }

}

customElements.define('error-dialog', ErrorDialog, { extends: 'dialog' });