import sass from "sass";
import fs from "fs";

// Recursively search for all .scss files in ./public and compile them to .css
function compileSass() {
    const files = fs.readdirSync("./public/scss", { withFileTypes: true });
    files.forEach((file) => {
        if (file.isDirectory()) {
            
        } else if (file.isFile() && file.name.endsWith(".scss")) {
            const result = sass.compile("./public/scss/" + file.name, { style: "compressed" });
            fs.writeFileSync("./public/scss/" + file.name.replaceAll(".scss", ".css"), result.css);
        }
    });
}

compileSass();