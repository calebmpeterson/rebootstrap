const fs = require("fs");
const { copySync } = require("cpx");
const Handlebars = require("handlebars");

const THEMES_ROOT = "./themes";
const TEMPLATES_ROOT = "./templates";
const DOCS_ROOT = "./docs";

const thumbnailTemplate = fs.readFileSync(
  `${TEMPLATES_ROOT}/thumbnail.hbs`,
  "UTF-8"
);
const thumbnail = Handlebars.compile(thumbnailTemplate);

fs.readdirSync(THEMES_ROOT).forEach((theme) => {
  console.log(`Creating thumbnail for ${theme}`);
  const pkg = require(`.${THEMES_ROOT}/${theme}/package.json`);
  const thumbnailHtml = thumbnail(pkg.thumbnail);
  fs.writeFileSync(
    `${THEMES_ROOT}/${theme}/docs/thumbnail.html`,
    thumbnailHtml,
    "UTF-8"
  );

  console.log(`Copying docs for ${theme}`);
  copySync(`${THEMES_ROOT}/${theme}/docs/**/*`, `${DOCS_ROOT}/themes/${theme}`);
});
