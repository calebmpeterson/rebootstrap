const fs = require("fs");
const { copySync } = require("cpx");

const THEMES_ROOT = "./themes";
const DOCS_ROOT = "./docs";

fs.readdirSync(THEMES_ROOT).forEach((theme) => {
  console.log(`Copying docs for ${theme}`);
  copySync(`${THEMES_ROOT}/${theme}/docs/**/*`, `${DOCS_ROOT}/themes/${theme}`);
});
