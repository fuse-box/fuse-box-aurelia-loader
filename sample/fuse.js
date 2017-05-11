// builtin plugins
const {
    RawPlugin,
    FuseBox,
    HTMLPlugin,
    CSSPlugin,
    Sparky
} = require("fuse-box");





Sparky.task('copy-fonts', () => {
    Sparky.src('node_modules/materialize-css/dist/fonts/**/**.**')
        .dest('fonts/');
});





Sparky.task('dev', () => {
    // typechecker (minor bug first time when caching vendor bundle, its on my todo list(vegar)... just need to talk to fusebox team..)
    const TypeCheckPlugin = require('fuse-box-typechecker').TypeCheckPlugin;
    const fuse = FuseBox.init({
        homeDir: './src',
        output: './dist/$name.js',
        plugins: [
            TypeCheckPlugin(),
            CSSPlugin(),
            HTMLPlugin(),
            RawPlugin(['.css', '.woff'])
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
        + aurelia-logging-console 
        + aurelia-templating-binding 
        + aurelia-templating-resources 
        + aurelia-event-aggregator 
        + aurelia-history-browser 
        + aurelia-templating-router
        + aurelia-materialize-bridge
        + materialize-css-styles`)
        .alias({
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



    fuse.dev({
        root: './'
    });
    fuse.run();
});





Sparky.task('loader', () => {
    // typechecker (minor bug first time when caching vendor bundle, its on my todo list(vegar)... just need to talk to fusebox team..)
    const TypeCheckPlugin = require('fuse-box-typechecker').TypeCheckPlugin;
    const fuse = FuseBox.init({
        homeDir: '../src',
        output: './dist/$name.js',
        plugins: [
            TypeCheckPlugin(),
            CSSPlugin(),
            HTMLPlugin(),
            RawPlugin(['.css', '.woff'])
        ],
        package: {
            name: "fuse-box-aurelia-loader",
            main: "fuse-box-aurelia-loader.ts"
        },
    });


    // app bundle
    // todo, we need to have vendor bundle and app bundle...
    fuse.bundle('fuse-box-aurelia-loader')
        .watch().cache(false)
        .instructions(`
            [*.ts]
           
        `).sourceMaps(true);




    fuse.run();
});


// run dev and loader build in parallell
Sparky.task("run", ["&loader", "&dev"], () => {

});