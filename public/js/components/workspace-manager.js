class WorkspaceManager extends HTMLElement {

    currentId = null;

    connectedCallback() {
        this.querySelector(".save-file").addEventListener("click", this.saveWorkspace.bind(this));
        this.querySelector(".open-file").addEventListener("click", this.openWorkspace.bind(this));
        this.querySelector(".new-file").addEventListener("click", this.newWorkspace.bind(this));
    }

    saveWorkspace() {
        if (this.currentId) {
            this.updateWorkspace();
        } else {
            this.createWorkspace();
        }
    }

    openWorkspace() {
        let dialog = document.querySelector("dialog[is='open-workspace-dialog']");
        fetch("/api/workspace").then(response => response.json()).then(workspaces => {
            dialog.querySelector(".workspace-list").innerHTML = "";
            workspaces.forEach(workspace => {
                console.log(workspace);
                const workspaceElement = document.createElement("div");
                workspaceElement.classList.add("workspace");
                workspaceElement.innerHTML = `<span>${workspace.title}</span><span>${(new Date(workspace.updatedAt)).toLocaleDateString()}</span>`;
                workspaceElement.addEventListener("click", event => {
                    this.currentId = workspace._id;
                    document.querySelector(".project-title").textContent = workspace.title;
                    document.querySelectorAll("#sidebar .elements .pinto-element").forEach(sp => sp.remove());
                    workspace.data.forEach(sp => {
                        const newElement = document.createElement(sp.type);
                        newElement.data = sp;
                        document.querySelector("#sidebar .elements").appendChild(newElement);
                    });
                    dialog.close();
                });
                dialog.querySelector(".workspace-list").appendChild(workspaceElement);
            });
            dialog.showModal();

        });
    }

    createWorkspace() {
        const title = document.querySelector(".project-title").textContent.toLowerCase().replaceAll(" ", "-");
        const data = [...document.querySelectorAll("#sidebar .elements .pinto-element")].map(sp => sp.getData());
        fetch("/api/workspace", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                data,
            }),
        }).then(response => response.json()).then(workspace => {
            this.currentId = workspace._id;
        });
    }

    updateWorkspace() {
        const title = document.querySelector(".project-title").textContent.toLowerCase().replaceAll(" ", "-");
        const data = [...document.querySelectorAll("#sidebar .elements .pinto-element")].map(sp => sp.getData());
        fetch("/api/workspace/" + this.currentId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                data,
            }),
        }).then(response => response.json());
    }

    newWorkspace() {
        document.querySelector(".project-title").textContent = "Untitled project";
        document.querySelectorAll("#sidebar .elements .pinto-element").forEach(sp => sp.remove());
        this.currentId = null;
    }


}

customElements.define('workspace-manager', WorkspaceManager);