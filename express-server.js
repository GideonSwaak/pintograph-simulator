import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import sass from "sass";

export function runServer(port, filePath, useCors = false) {
    filePath = path.dirname(filePath);
    filePath = fileURLToPath(filePath);
    const app = express();

    if (useCors) {
        app.use(cors());
    }
    
    app.get(/\.css$/, (req, res) => {
        console.log(req.path);
        const _filePath = path.join(filePath, "/public/", req.path.replaceAll(".css", ".scss"));
        const result = sass.compile(_filePath, { style: "compressed" });
        res.set("Content-Type", "text/css");
        res.send(result.css);
    });

    app.use(express.static(path.join(filePath, "/public")));
    


    app.listen(port, () => console.log("Server listening on port", port));
    return app;
}