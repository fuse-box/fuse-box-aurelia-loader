import { HmrContext } from 'aurelia-hot-module-reload';
import { inject } from 'aurelia-dependency-injection';
import { Loader } from 'aurelia-loader';
import { getLogger, Logger } from 'aurelia-logging';
import { FuseBoxAureliaLoader } from 'fuse-box-aurelia-loader';

const log: Logger = getLogger('fuse-box-aurelia-hmr-plugin');

declare var FuseBox: any;

export class FuseBoxAureliaHmrPlugin {
    private context: HmrContext;
    constructor(loader: FuseBoxAureliaLoader) {
        this.context = new HmrContext(loader);
        log.debug('Constructed fuse-box aurelia HMR plugin');
    }

    public async hmrUpdate(data: any): Promise<boolean> {
        if (data.type === 'js') {
            log.debug('Updating view or view model', data);

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

        return false;
    }
}
