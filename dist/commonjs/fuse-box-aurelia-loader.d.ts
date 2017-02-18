import { Loader } from 'aurelia-loader';
export declare class FuseBoxAureliaLoader extends Loader {
    textPluginName: string;
    loaderPlugins: any;
    moduleRegistry: any;
    templateRegistry: any;
    templateLoader: any;
    constructor();
    useTemplateLoader(templateLoader: any): void;
    loadAllModules(ids: any): Promise<any>;
    loadTemplate(url: any): Promise<any>;
    loadText(url: any): Promise<any>;
    loadModule(id: any): Promise<any>;
    addPlugin(pluginName: any, implementation: any): void;
    normalize(moduleId: any, relativeTo: any): Promise<any>;
    map(id: any, source: any): void;
    _import(address: any): any;
    applyPluginToUrl(url: any, pluginName: any): string;
    loadWithFusebox(args: any): any;
    fuseBoxExist(id: any): boolean;
    private findFuseBoxPath(path);
}
