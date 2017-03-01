var build = function() {

    let fb = require("fuse-box");
    let fuse = fb.FuseBox;

    let bundle = fuse.init({
        package: {
            name:"aurelia-v-grid",
            main: "index.ts"
        },
        homeDir: "./node_modules/aurelia-v-grid/src/",
        outFile: "./bundle/aurelia-v-grid/fb-aurelia-v-grid-bundle.js",
        sourceMap: {
            bundleReference: "./fb-aurelia-v-grid-bundle.js.map",
            outFile: "./bundle/aurelia-v-grid/fb-aurelia-v-grid-bundle.js.map",
        },
        plugins: [
            [/\.css$/, fb.RawPlugin({extensions: ['.css']})],
            fb.HTMLPlugin({
                useDefault: true
            }),
            fb.TypeScriptHelpers(),
            fb.SourceMapPlainJsPlugin()
        ]
    })


    // include everything in grid (html elements/css and attribute)
    bundle.bundle(`
    + [**/*.html] 
    + [**/*.ts]
    + [**/*.css]
`);


}

build();