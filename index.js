import { runServer } from "./express-server.js";
import workspaceRouter from "./routers/workspace-router.js";
import { initSessionManager } from "../libraries/user_management/session_manager.js";
import mongoose from "mongoose";
const port = process.argv[2];
const app = runServer(port, import.meta.url);

initSessionManager(app);
mongoose.connect("mongodb://localhost:27017/pinto", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.get("/status", (req, res) => {
    if (req.session.username) {
        res.status(200).json(req.session);
    } else {
        res.status(200).json({ username: null });
    }
});

app.use("/api/workspace", workspaceRouter);