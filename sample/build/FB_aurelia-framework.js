var build = function() {

    let fb = require("fuse-box");
    let fuse = fb.FuseBox;

    let bundle = fuse.init({
        homeDir: "./src",
        outFile: "./bundle/fb-aurelia-framework-bundle.js",
        plugins: [
            [/\.css$/, fb.RawPlugin({extensions: ['.css']})],
            fb.HTMLPlugin(),
            fb.TypeScriptHelpers(),
        ]
    })

    bundle.bundle(`
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
    + aurelia-templating-router
    + aurelia-hot-module-reload`);

}

build();