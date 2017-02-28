import { Loader, TemplateRegistryEntry } from 'aurelia-loader';
export declare type LoaderPlugin = {
    fetch: (address: string) => Promise<TemplateRegistryEntry> | TemplateRegistryEntry;
};
export declare class TextTemplateLoader {
    loadTemplate(loader: Loader, entry: TemplateRegistryEntry): Promise<void>;
}
export declare function ensureOriginOnExports(moduleExports: any, moduleId: string): any;
export declare class FuseBoxAureliaLoader extends Loader {
    textPluginName: string;
    loaderPlugins: any;
    moduleRegistry: any;
    templateRegistry: any;
    templateLoader: TextTemplateLoader;
    modulesBeingLoaded: Map<string, Promise<any>>;
    constructor();
    useTemplateLoader(templateLoader: TextTemplateLoader): void;
    loadAllModules(ids: any[]): Promise<any>;
    loadTemplate(url: any): Promise<any>;
    loadText(url: any): Promise<any>;
    loadModule(moduleId: any): Promise<any>;
    addPlugin(pluginName: any, implementation: any): void;
    normalize(moduleId: any, relativeTo: any): Promise<any>;
    map(): void;
    _import(address: any): Promise<any>;
    applyPluginToUrl(url: any, pluginName: any): string;
    loadWithFusebox(args: any): any;
    fuseBoxExist(id: any): boolean;
    private findFuseBoxPath(path);
}
