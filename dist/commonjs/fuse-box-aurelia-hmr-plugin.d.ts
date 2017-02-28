import { FuseBoxAureliaLoader } from './fuse-box-aurelia-loader';
export declare class FuseBoxAureliaHmrPlugin {
    private context;
    private reloadPageOnly;
    private timer;
    constructor(loader: FuseBoxAureliaLoader, reloadPageOnly: boolean);
    hmrUpdate(data: any): Promise<boolean>;
}
