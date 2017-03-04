import { FuseBoxAureliaLoader } from './fuse-box-aurelia-loader';

declare var FuseBox: any;
declare var require: any;

export class FuseBoxAureliaHmrPlugin {
    private context: any;
    private reloadPageOnly: boolean;
    private timer: number;
    private loader: any;
    constructor(loader: FuseBoxAureliaLoader, reloadPageOnly: boolean) {
        if (!reloadPageOnly) {
            // no need to have this if they are using the reload only
            let HmrContext = require('aurelia-hot-module-reload').HmrContext;
            this.context = new HmrContext(loader);
            this.loader = loader;
        }
        this.reloadPageOnly = reloadPageOnly;
    }

    public hmrUpdate(data: any): boolean {

        if (this.reloadPageOnly) {

            // incase its building many...(maybe this is not needed) //todo check
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                document.location.reload();
            }, 250);

        } else {

            if (data.type === 'js') {

                // first let fusebox change the code
                FuseBox.flush();
                FuseBox.dynamic(data.path, data.content);
                if (FuseBox.mainFile) {
                    FuseBox.import(FuseBox.mainFile);
                }

                // call Aurelia HMR module
                if (data.path.indexOf('.html') >= 0) {
                    this.context.handleViewChange(data.path); // <- returns promise...
                    return true;
                } else {
                    if (data.path.indexOf('.css') >= 0) {
                        this.loader.moduleRegistry[data.path] = true; // need to have this module without css-resouses!
                        this.context.reloadCss(data.path);
                        return true;
                    } else {
                        let moduleId = data.path.substr(0, data.path.length - 3); // remove .js
                        this.context.handleModuleChange(moduleId, {}); // <- returns promise...
                        return true;
                    }
                }
            }
        }

        return false;
    }
}
