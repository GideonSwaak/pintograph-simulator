class AccountStatus extends HTMLElement {

    status;
    localhost = false;
    connectedCallback() {
        this.status = window.localStorage.getItem("username");
        this.refreshStatus();
        this.render();
    }

    refreshStatus() {
        fetch("/status").then(res => res.json()).then(data => {
            this.status = data;
            window.localStorage.setItem("username", this.status);
            this.render();
        });
    }

    render() {
        if (this.status.username) {
            this.innerHTML = `Logged in as ${this.status.username} <a href="https://login.gideon.nu/logout?redirect=https://pintograph.gideon.nu" class="logout">Logout</a>`;
        } else if (!this.localhost) {
            this.innerHTML = `
            <a href="https://login.gideon.nu?redirect=https://pintograph.gideon.nu" class="login">Login</a> <button class="localsession-button">Localsession mode</button>
            `;
            this.querySelector(".localsession-button").addEventListener("click", () => {
                this.localhost = true;
                this.render();
            })
        } else {
            this.innerHTML = "<span>This is a local session, your data will be saved locally.</span>";
        }
    }

}

customElements.define('account-status', AccountStatus);