var build = function() {

    let fb = require("fuse-box");
    let fuse = fb.FuseBox;

    let bundle = fuse.init({
        homeDir: "./src",
        outFile: "./bundle/fb-app-bundle.js",
        useCache: true,
        plugins: [
            [/\.css$/, fb.RawPlugin({extensions: ['.css']})],
            fb.HTMLPlugin({
                useDefault: true
            }),
            fb.TypeScriptHelpers(),
            fb.SourceMapPlainJsPlugin(),
            fb.EnvPlugin({ 
                FB_AU_LOG: false,
                FB_AU_HMR: false,
                FB_AU_RELOAD: true 
            })
        ],
        sourceMap: {
            bundleReference: "./fb-app-bundle.js.map",
            outFile: "./bundle/fb-app-bundle.js.map",
        }
        
    });

    // Start dev server
    bundle.devServer(`
        > [main.ts]
        + [**/*.html] 
        + [**/*.ts] 
        + [**/*.css]
        + aurelia-bootstrapper
        + aurelia-framework
        + aurelia-pal
        + aurelia-metadata
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
        + aurelia-hot-module-reload
        `, {
        root: './'
    })

}

build();