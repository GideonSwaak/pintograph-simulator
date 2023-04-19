import "./components/pinto-canvas.js";
import "./components/sidebar/sidebar.js";
import "./components/new-pinto-dialog/new-pinto-dialog.js";
import "./components/settings-dialog.js";
import "./components/error-dialog.js";
import "./components/account-status.js"
import "./components/workspace-manager.js";

navigator.serviceWorker?.register('sw.js').then(registration => {
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
}, error => {
    console.log('ServiceWorker registration failed:', error);
});