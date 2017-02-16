var build = function() {

    let fb = require("fuse-box");
    let fuse = fb.FuseBox;

    let bundle = fuse.init({
        homeDir: "./src",
        outFile: "./bundle/fb-app-bundle.js",
        useCache: false,
        plugins: [
            fb.CSSPlugin(),
            fb.HTMLPlugin({
                useDefault: true
            }),
            fb.TypeScriptHelpers()
        ]
    });

    // Start dev server
    bundle.devServer(`
        > [main.ts]
        + [**/*.html] 
        + [**/*.ts] 
        + [**/*.css]
        `, {
        root: './'
    })

}

build();