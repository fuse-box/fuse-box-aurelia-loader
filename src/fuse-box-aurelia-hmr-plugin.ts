import { FuseBoxAureliaLoader } from './fuse-box-aurelia-loader';

declare var FuseBox: any;
declare var require: any;

export class FuseBoxAureliaHmrPlugin {
    private context: any;
    private reloadPage: boolean;
    private timer: number;
    constructor(loader: FuseBoxAureliaLoader, reloadPage: boolean) {
        let HmrContext = require('aurelia-hot-module-reload').HmrContext;
        this.context = new HmrContext(loader);
        this.reloadPage = reloadPage;
    }

    public async hmrUpdate(data: any): Promise<boolean> {

        if (this.reloadPage) {
            // incase its building many...(maybe this is not needed)
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
                    await this.context.handleViewChange(data.path);
                    return true;
                } else {
                    let moduleId = data.path.substr(0, data.path.length - 3); // remove .js
                    await this.context.handleModuleChange(moduleId, {});
                    return true;
                }
            }
        }

        return false;
    }
}
