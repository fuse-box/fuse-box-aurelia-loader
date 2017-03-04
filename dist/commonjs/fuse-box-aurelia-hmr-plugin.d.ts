import { FuseBoxAureliaLoader } from './fuse-box-aurelia-loader';
export declare class FuseBoxAureliaHmrPlugin {
    private context;
    private reloadPageOnly;
    private timer;
    private loader;
    constructor(loader: FuseBoxAureliaLoader, reloadPageOnly: boolean);
    hmrUpdate(data: any): boolean;
}
