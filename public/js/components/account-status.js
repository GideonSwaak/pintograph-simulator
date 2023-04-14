class AccountStatus extends HTMLElement {

    status;

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
        } else {
            this.innerHTML = `
            <a href="https://login.gideon.nu?redirect=https://pintograph.gideon.nu" class="login">Login</a>
            `;
        }
    }

}

customElements.define('account-status', AccountStatus);