import "./lissajous-curves-element.js";
import "./proper-pintograph-element.js";
import "./simple-pintograph-element.js";
import "./rotary-pintograph-element.js";
import TestCustomDrawer from "../../drawers/test-custom-drawer.js";

const sidebarElements = document.querySelector("#sidebar .elements");
const renderButton = document.querySelector("#render-button");
const settingsButton = document.querySelector("#settings-button");
const addPintoButton = document.querySelector("#add-pintograph-button");

addPintoButton.addEventListener("click", event => {
    let dialog = document.querySelector("dialog[is='new-pinto-dialog']");
    dialog.showModal();
});

settingsButton.addEventListener("click", event => {
    let dialog = document.querySelector("dialog[is='settings-dialog']");
    dialog.showModal();
});

renderButton.addEventListener("click", render);

window.addEventListener("keydown", event => {
    if (event.key == "Enter" || (event.ctrlKey && event.key == "s")) {
        event.preventDefault();
        render();
    }
})

function render() {
    const pintoCanvas = document.querySelector("main pinto-canvas").replace();
    const pintographs = parsePintographElements();
    pintoCanvas.setPintographScene(scene => pintographs.forEach(sp => sp.build(scene)));
    pintoCanvas.run();
}

function parsePintographElements() {
    let pintographs = [...sidebarElements.querySelectorAll(".pinto-element")];
    pintographs = pintographs.map(sp => sp.getPintograph());
    return pintographs;
}

function parseCustomDrawers() {
    let customDrawers = [...sidebarElements.querySelectorAll(".custom-drawer")];
    customDrawers = customDrawers.map(cd => cd.getCustomDrawer());
    return customDrawers;
}
let tempStorage;
document.querySelector(".save-file").addEventListener("click", event => {
    const title = document.querySelector(".project-title").textContent.toLowerCase().replaceAll(" ", "-");
    const data = [...sidebarElements.querySelectorAll(".pinto-element")].map(sp => sp.getData());
    tempStorage = data;
    downloadJSON(title + ".pinto", data);
});

document.querySelector(".new-file").addEventListener("click", event => {
    document.querySelector(".project-title").textContent = "Untitled project";
    sidebarElements.querySelectorAll(".pinto-element").forEach(sp => sp.remove());
});

document.querySelector(".open-file").addEventListener("click", event => {
    const dialog = document.querySelector("dialog[is='open-file-dialog']");
    dialog.showModal();
});

document.querySelector("#open-file-input").addEventListener("change", event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = event => {
        const data = JSON.parse(event.target.result);
        document.querySelector(".project-title").textContent = file.name.replace(".pinto", "");
        sidebarElements.querySelectorAll(".pinto-element").forEach(sp => sp.remove());
        data.forEach(sp => {
            const newElement = document.createElement(sp.type);
            newElement.data = sp;
            sidebarElements.appendChild(newElement);
        });
        event.target.value = "";
        document.querySelector("dialog[is='open-file-dialog']").close();
    };
    reader.readAsText(file);
});

function downloadJSON(filename, data) {
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(data)));
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}