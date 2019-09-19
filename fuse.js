const { fusebox, sparky } = require('fuse-box');
const { pluginTypeChecker } = require('fuse-box-typechecker');

class Context {
    isProduction;
    runServer;
    getConfig() {
        return fusebox({
            target: 'browser',
            homeDir: './src/sample',
            output: `dev`,
            entry: `./src/main.ts`,
            webIndex: {
                template: `src/sample/index.html`
            },
            dependencies: {
                include: [
                    'fuse-box-aurelia-loader',
                    'aurelia-bootstrapper',
                    'aurelia-pal-browser',
                    'aurelia-logging-console',
                    'aurelia-templating-binding',
                    'aurelia-templating-resources',
                    'aurelia-event-aggregator',
                    'aurelia-history-browser',
                    'aurelia-templating-router'
                ]
            },
            cache: {
                root: '.cache',
                enabled: true
            },
            devServer: this.runServer,
            plugins: [
                pluginTypeChecker({
                    tsConfig: './tsconfig.json'
                })
            ]
        });
    }
}
const { task } = sparky(Context);

task('default', async ctx => {
    ctx.runServer = true;
    const fuse = ctx.getConfig();
    await fuse.runDev();
});
