import "./lissajous-curves-element.js";
import "./proper-pintograph-element.js";
import "./simple-pintograph-element.js";
import "./rotary-pintograph-element.js";

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
    let pintographs = [...sidebarElements.querySelectorAll("simple-pintograph, proper-pintograph, lissajous-curves, rotary-pintograph")];
    pintographs = pintographs.map(sp => sp.getPintograph());
    setPintographFunction(scene => {
        pintographs.forEach(sp => sp.build(scene));
    });
}

function setPintographFunction(func) {
    let canvas = document.querySelector("pinto-canvas:not(.example)");
    canvas.scene?.reset();
    canvas?.remove();
    canvas = document.createElement("pinto-canvas");
    document.querySelector("main").appendChild(canvas); 
    canvas.initiateScene(func);
}