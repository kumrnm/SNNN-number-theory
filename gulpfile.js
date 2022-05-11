const { src, dest, watch, parallel } = require("gulp");
const browserSync = require("browser-sync").create();
const plumber = require("gulp-plumber");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const minifier = require("gulp-minifier")
const del = require("del");
const fs = require("fs");

const SRC = "src/";
const DIST = "dist/";
const TEMP = "temp/";

const DOMAIN = "https://kumrnm.github.io";
const PATH_BASE = "/SNNN-number-theory/";
const URL_BASE = DOMAIN + PATH_BASE;


// file processing

function task_ejs() {
    return src([`${SRC}**/*.ejs`, `!${SRC}**/_*.ejs`])
        .pipe(plumber())
        .pipe(ejs({ DOMAIN, PATH_BASE, URL_BASE }))
        .pipe(rename({ extname: ".html" }))
        .pipe(minifier({ minify: true, minifyHTML: { collapseWhitespace: true } }))
        .pipe(dest(DIST));
}

function task_copy() {
    return src([`${SRC}**/*`, `!${SRC}**/_*`, `!${SRC}**/*.ejs`])
        .pipe(minifier({ minify: true, minifyJS: true, minifyCSS: true }))
        .pipe(dest(DIST));
}


// environment

function task_serve() {
    if (!fs.existsSync(TEMP)) fs.mkdirSync(TEMP);
    fs.writeFileSync(`${TEMP}index.html`, `<meta http-equiv="refresh" content="0;URL='${PATH_BASE}'" />`);

    browserSync.init({
        open: false,
        server: {
            baseDir: TEMP,
            routes: {
                [PATH_BASE]: DIST
            }
        }
    });
}

function task_watch() {
    watch(`${SRC}**/*.ejs`, task_ejs);
    watch([`${SRC}**/*`, `!${SRC}**/_*`, `!${SRC}**/*.ejs`], task_copy);

    watch(`${DIST}**/*`, task_reload);
}

function task_reload(cb) {
    browserSync.reload();
    cb();
}


// exports

module.exports = {
    default: parallel(task_serve, task_watch),
    build: parallel(task_ejs, task_copy),
    clean: parallel(() => del(DIST), () => del(TEMP))
};
