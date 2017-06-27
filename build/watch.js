var gulp = require('gulp');
var path = require('path');
var runSequence = require('run-sequence');
var autoLoadAureliaLoaders =function() {
    var loader = function(){}
    loader.prototype.init = function(context) {}
    loader.prototype.bundleEnd = function(context) {
        context.source.addContent(`FuseBox.import("fuse-box-aurelia-loader")`);
        context.source.addContent(`FuseBox.import("aurelia-bootstrapper")`);
    }
    return new loader();
}

// so fusebox uses correct path
process.env.PROJECT_ROOT = path.resolve(process.cwd(), './sample/')

// builtin plugins
const {
    RawPlugin,
    FuseBox,
    HTMLPlugin,
    CSSPlugin,
    Sparky
} = require("../sample/node_modules/fuse-box");

var TypeHelper = require('../sample/node_modules/fuse-box-typechecker').TypeHelper


gulp.task('copy-fonts', () => {
    return gulp.src('node_modules/materialize-css/dist/fonts/**/**.**')
        .pipe(gulp.dest('fonts/'));
});


// sample typechecker
gulp.task('sample-typechecker', function () {
    // set correct dir first..
    process.chdir('./sample');
    var testWatch = TypeHelper({
        tsConfig: './tsconfig.json',
        name: 'Sample Watch'
    })
    testWatch.runWatch('./src')
    return true;
});


gulp.task('plugin-typechecker', function () {
    // set correct dir first..

    var testWatch = TypeHelper({
        tsConfig: './tsconfig.json',
        name: 'Plugin Watch'
    })
    testWatch.runWatch('./src')
    return true;
});



// this task will start fusebox
gulp.task('fuse-sample', function () {

    // init fusebox
    const fuse = FuseBox.init({
        homeDir: './src',
        output: './dist/$name.js',
        plugins: [
            autoLoadAureliaLoaders(),
            CSSPlugin(),
            HTMLPlugin(),
            RawPlugin(['.css'])
        ]
    });


    fuse.register('materialize-css-styles', {
        homeDir: 'node_modules/materialize-css/dist/css',
        main: 'materialize.css',
        instructions: ' '
    });


    // Register the bridge and its contents.
    fuse.register('aurelia-materialize-bridge', {
        homeDir: 'node_modules/aurelia-materialize-bridge/dist/commonjs',
        main: 'index.js',
        instructions: '**/*.{html,css,js}'
    });

    // vendor bundle
    fuse.bundle("vendor")
        .cache(true)
        .instructions(` 
        + aurelia-bootstrapper
        + aurelia-framework
        + aurelia-pal
        + aurelia-metadata
        + aurelia-loader-default
        + aurelia-polyfills
        + aurelia-fetch-client
        + aurelia-pal-browser
        + aurelia-animator-css
        + fuse-box-css
        + aurelia-logging-console 
        + aurelia-templating-binding 
        + aurelia-templating-resources 
        + aurelia-event-aggregator 
        + aurelia-history-browser 
        + aurelia-templating-router
        + aurelia-materialize-bridge
        + materialize-css-styles
        `).alias({
            'jQuery': 'jquery'
        })
        .shim({
            jquery: {
                source: 'node_modules/jquery/dist/jquery.js',
                exports: '$'
            },
            'materialize-css': {
                source: 'node_modules/materialize-css/dist/js/materialize.js',
                exports: 'Materialize'
            }
        });


    // app bundle
    // todo, we need to have vendor bundle and app bundle...
    fuse.bundle('app')
        .watch().cache(false).hmr()
        .instructions(`
            > [main.ts]
            + [**/*.{ts,html,css}]
        `);

    // web server    
    fuse.dev({
        root: './'
    });

    // run
    return fuse.run()
});


// this task will start fusebox
gulp.task('fuse-plugin', function () {

    // package init
    const fuse = FuseBox.init({
        homeDir: '../src',
        output: './dist/$name.js',
        plugins: [],
        package: {
            name: "fuse-box-aurelia-loader",
            main: "fuse-box-aurelia-loader.ts"
        },
    });


    // plugin bundle
    fuse.bundle('fuse-box-aurelia-loader')
        .watch().cache(false)
        .instructions(`
            [*.ts]
        `).sourceMaps(true);


    //build file    
    return fuse.run();
});


// this task will start fusebox
gulp.task('watch', function () {
    return runSequence(
        'fuse-plugin', 'fuse-sample', 'plugin-typechecker', 'sample-typechecker', 'copy-fonts'
    );
});