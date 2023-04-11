class SettingsDialog extends HTMLDialogElement {
    connectedCallback() {
        this.querySelector(".close-button").addEventListener("click", this.close.bind(this));
        this.querySelector("input[name='hide-tools']").addEventListener("change", () => document.querySelector("main").classList.toggle("hide-tools"));
        this.querySelector("input[name='canvas-color']").addEventListener("change", () => {
            const backgroundColor = document.querySelector("input[name='canvas-color']").value;
            document.querySelector("pinto-canvas canvas:first-child").style.backgroundColor = backgroundColor;
        });
    }

    showModal() {
        super.showModal();
    }

    close() {
        super.close();
    }
}

customElements.define("settings-dialog", SettingsDialog, { extends: "dialog" });