var build = function() {

    let fb = require("fuse-box");
    let fuse = fb.FuseBox;

    let bundle = fuse.init({
        homeDir: "./src",
        outFile: "./bundle/fb-aurelia-framework-bundle.js",
        plugins: [
            fb.TypeScriptHelpers(),
        ]
    })

    bundle.bundle(`
    - process
    `);

}

build();