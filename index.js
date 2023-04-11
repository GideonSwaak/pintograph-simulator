import { runServer } from "./express-server.js";
const port = process.argv[2];
const app = runServer(port, import.meta.url);
