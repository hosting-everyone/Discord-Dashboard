const fs = require("fs");
fs.writeFileSync(
    ".gitignore",
    `
# Ignore everything in this directory but not dist
*
!dist/*
!./dist
!./dist/*
`
);
