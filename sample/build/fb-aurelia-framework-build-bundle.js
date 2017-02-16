var build = function() {

    let fb = require("fuse-box");
    let fuse = fb.FuseBox;

    let bundle = fuse.init({
        package: "fuse-box-aurelia-loader",
        homeDir: "../src",
        outFile: "./bundle/fb-aurelia-framework-bundle.js",
        globals: {
            "fuse-box-aurelia-loader": "fuse-box-aurelia-loader"
        },
        plugins: [
            fb.CSSPlugin(),
            fb.HTMLPlugin(),
            fb.TypeScriptHelpers()
        ]
    })

    bundle.bundle(`>[fuse-box-aurelia-loader.ts]
    + aurelia-bootstrapper
    + aurelia-framework
    + aurelia-pal
    + aurelia-metadata
    + aurelia-loader-default
    + aurelia-polyfills
    + aurelia-fetch-client
    + aurelia-pal-browser
    + aurelia-animator-css
    + aurelia-logging-console 
    + aurelia-templating-binding 
    + aurelia-templating-resources 
    + aurelia-event-aggregator 
    + aurelia-history-browser 
    + aurelia-templating-router`);

}

build();