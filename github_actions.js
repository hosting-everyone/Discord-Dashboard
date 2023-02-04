const fs = require("fs");
fs.writeFileSync(
    ".gitignore",
    `
node_modules

`
);
