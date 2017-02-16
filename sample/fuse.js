
const fb = require("fuse-box");
const fuse = fb.FuseBox;



//Grid Bundle Init
//I need to ask if there is a better way to do this, I need to include it in devserver bundle to else I will be missing entry point
// I wish I could define the package above directly in 1 bundle, or multible packages in 1 file
// ->https://github.com/fuse-box/fuse-box/issues/170
let gridBundle = fuse.init({
        package: "aurelia-v-grid",
        homeDir: "./node_modules/aurelia-v-grid/src/",
        outFile: "./bundle/plugin-bundle.js",
        plugins: [
        fb.CSSPlugin(),
        fb.HTMLPlugin({ useDefault: true }),
        fb.TypeScriptHelpers()
    ]
})


// include everything in grid (html elements/css and attribute)
gridBundle.bundle(`> index.ts
    + **/*.html 
    + **/*.ts
    + **/*.css
    - aurelia-framework
    - aurelia-dependency-injectio
    - aurelia-metadata
    - aurelia-pal
    - aurelia-binding
    - aurelia-logging
    - aurelia-task-queue
    - aurelia-templating
    - aurelia-path
    - aurelia-loader`
    );

// Todo: fix, this just wont have a entry point.... I do now know why,Ive tried globals:{"fuse-box-aurelia-loader":"fuse-box-aurelia-loader"}
// so for now I will just copy the file... I do not like this :-(
//let fuseLoader = fuse.init({
//        package: "fuse-box-aurelia-loader",
//        homeDir: "../src",
//        outFile: "./bundle/fuse-aurleia-loader-bundle.js",
//        plugins: [
//        fb.CSSPlugin(),
//        fb.HTMLPlugin({ useDefault: true }),
//        fb.TypeScriptHelpers()
//    ]
//})
// include everything in grid (html elements/css and attribute)
//fuseLoader.bundle(`> fuse-box-aurelia-loader.ts
//    - aurelia-framework
 //   - aurelia-dependency-injectio
//    - aurelia-metadata
//    - aurelia-pal
//    - aurelia-binding
//    - aurelia-logging
//    - aurelia-task-queue
//    - aurelia-templating
//    - aurelia-path
//    - aurelia-loader`
//    );


// App Bundle Init
let appBundle = fuse.init({
    homeDir: "./src",
    outFile: "./bundle/app-bundle.js",
    useCache:false,
    plugins: [
        fb.CSSPlugin(),
        fb.HTMLPlugin({ useDefault: true }),
        fb.TypeScriptHelpers()
    ],
    sourceMap: {
        bundleReference: "./bundle/app-bundle.js.map",
        outFile: "./bundle/app-bundle.js.map",
    }
});


// Start dev server
appBundle.devServer(`
    > main.ts
    + **/*.html 
    + **/*.ts 
    + **/*.css
    + aurelia-framework
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
    `,{
   root: './'
})

