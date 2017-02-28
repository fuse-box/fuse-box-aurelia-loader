import { FuseBoxAureliaLoader } from './fuse-box-aurelia-loader';
export declare class FuseBoxAureliaHmrPlugin {
    private context;
    constructor(loader: FuseBoxAureliaLoader);
    hmrUpdate(data: any): Promise<boolean>;
}
