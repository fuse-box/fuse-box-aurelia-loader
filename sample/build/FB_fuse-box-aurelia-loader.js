var build = function() {

    let fb = require("fuse-box");
    let fuse = fb.FuseBox;

    let bundle = fuse.init({
        package: {
            name:"fuse-box-aurelia-loader",
            main:"fuse-box-aurelia-loader.ts"
        },
        homeDir: "../src",
        outFile: "./bundle/fuse-box-aurelia-loader/fb-fuse-box-aurelia-loader-bundle.js",
        sourceMap: {
            bundleReference: "./fb-fuse-box-aurelia-loader.js.map",
            outFile: "./bundle/fuse-box-aurelia-loader/fb-fuse-box-aurelia-loader.js.map",
        },
        plugins: [
            fb.TypeScriptHelpers(),
            fb.SourceMapPlainJsPlugin()
        ]
    })


    // include everything in grid (html elements/css and attribute)
    bundle.bundle('[*.ts]');


}

build();