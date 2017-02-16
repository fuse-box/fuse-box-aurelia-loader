var build = function() {

    let fb = require("fuse-box");
    let fuse = fb.FuseBox;

    let bundle = fuse.init({
        package: "aurelia-v-grid",
        homeDir: "./node_modules/aurelia-v-grid/src/",
        outFile: "./bundle/fb-aurelia-v-grid-bundle.js",
        globals: {
            "aurelia-v-grid": "aurelia-v-grid"
        },
        plugins: [
            fb.CSSPlugin(),
            fb.HTMLPlugin({
                useDefault: true
            }),
            fb.TypeScriptHelpers()
        ]
    })


    // include everything in grid (html elements/css and attribute)
    bundle.bundle(`
    > [index.ts]
    + [**/*.html] 
    + [**/*.ts]
    + [**/*.css]
`);


}

build();