import { runServer } from "./express-server.js";
import { initSessionManager } from "../libraries/user_management/session_manager.js";
const port = process.argv[2];
const app = runServer(port, import.meta.url);

initSessionManager(app);

app.get("/status", (req, res) => {
    if (req.session.username) {
        res.status(200).json({ username: req.session.username });
    } else {
        res.status(200).json({ username: null });
    }
});