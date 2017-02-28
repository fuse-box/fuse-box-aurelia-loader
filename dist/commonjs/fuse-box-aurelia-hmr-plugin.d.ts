import { FuseBoxAureliaLoader } from './fuse-box-aurelia-loader';
export declare class FuseBoxAureliaHmrPlugin {
    private context;
    private reloadPage;
    private timer;
    constructor(loader: FuseBoxAureliaLoader, reloadPage: boolean);
    hmrUpdate(data: any): Promise<boolean>;
}
