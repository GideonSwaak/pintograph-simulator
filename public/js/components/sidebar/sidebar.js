import "./drawing-forms/lissajous-curves-element.js";
import "./drawing-forms/proper-pintograph-element.js";
import "./drawing-forms/simple-pintograph-element.js";
import "./drawing-forms/rotary-pintograph-element.js";

const sidebarElements = document.querySelector("#sidebar .elements");
const renderButton = document.querySelector("#render-button");
const settingsButton = document.querySelector("#settings-button");
const fullscreenButton = document.querySelector("#fullscreen-button");
const addPintoButton = document.querySelector("#add-pintograph-button");
const screenshotButton = document.querySelector("#screenshot-button");

addPintoButton.addEventListener("click", () => document.querySelector("dialog[is='new-pinto-dialog']").showModal());

settingsButton.addEventListener("click", () => document.querySelector("dialog[is='settings-dialog']").showModal());

renderButton.addEventListener("click", render);

fullscreenButton.addEventListener("click", requestFullscreen);

function requestFullscreen() {
    const pintoCanvas = document.querySelector("main > pinto-canvas");
    const main = document.querySelector("main");
    // pintoCanvas.requestFullscreen();
    main.requestFullscreen();
    window.addEventListener("fullscreenchange", event => {
        window.screen.orientation.lock("landscape");
    });
    document.querySelector("main > pinto-canvas").addEventListener("fullscreenchange", event => {
    
    });
    [...pintoCanvas.querySelectorAll("canvas")].forEach(canvas => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

screenshotButton.addEventListener("click", () => {
    const pintoCanvas = document.querySelector("main > pinto-canvas");
    const previewCanvas = pintoCanvas.querySelector(".preview");
    // const toolCanvas = pintoCanvas.querySelector(".tools");
    // const overlayCanvas = pintoCanvas.querySelector(".overlay");
    const screenshotCanvas = document.createElement("canvas");
    screenshotCanvas.width = previewCanvas.width;
    screenshotCanvas.height = previewCanvas.height;
    const screenshotContext = screenshotCanvas.getContext("2d");
    screenshotContext.drawImage(previewCanvas, 0, 0);
    // screenshotContext.drawImage(toolCanvas, 0, 0);
    // screenshotContext.drawImage(overlayCanvas, 0, 0);
    const screenshot = screenshotCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = screenshot;
    link.download = "pintograph.png";
    link.click();
});

// fullscreenButton.addEventListener("click", () => {
//     const popup = window.open("https://pintograph.gideon.nu", "PintoGraph", "width=800,height=600");
//     popup.addEventListener("load", () => {
//         popup.document.querySelector("body").innerHTML = "Poep";
//     });
// });

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
    if (window.innerWidth < 800) {
        requestFullscreen();
    }
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


// document.querySelector(".save-file").addEventListener("click", event => {
//     const title = document.querySelector(".project-title").textContent.toLowerCase().replaceAll(" ", "-");
//     const data = [...sidebarElements.querySelectorAll(".pinto-element")].map(sp => sp.getData());
//     downloadJSON(title + ".pinto", data);
// });

// document.querySelector(".new-file").addEventListener("click", event => {
//     document.querySelector(".project-title").textContent = "Untitled project";
//     sidebarElements.querySelectorAll(".pinto-element").forEach(sp => sp.remove());
// });

// document.querySelector(".open-file").addEventListener("click", event => {
//     const dialog = document.querySelector("dialog[is='open-file-dialog']");
//     dialog.showModal();
// });

// document.querySelector("#open-file-input").addEventListener("change", event => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = event => {
//         const data = JSON.parse(event.target.result);
//         document.querySelector(".project-title").textContent = file.name.replace(".pinto", "");
//         sidebarElements.querySelectorAll(".pinto-element").forEach(sp => sp.remove());
//         data.forEach(sp => {
//             const newElement = document.createElement(sp.type);
//             newElement.data = sp;
//             sidebarElements.appendChild(newElement);
//         });
//         event.target.value = "";
//         document.querySelector("dialog[is='open-file-dialog']").close();
//     };
//     reader.readAsText(file);
// });

// function downloadJSON(filename, data) {
//     const element = document.createElement("a");
//     element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(data)));
//     element.setAttribute("download", filename);
//     element.style.display = "none";
//     document.body.appendChild(element);
//     element.click();
//     document.body.removeChild(element);
// }