import { Origin } from 'aurelia-metadata';
import { Loader, TemplateRegistryEntry } from 'aurelia-loader';
import { PLATFORM, DOM } from 'aurelia-pal';
import { getLogger, Logger } from 'aurelia-logging';
import { Container } from 'aurelia-dependency-injection';
import { Aurelia } from 'aurelia-framework';
export type LoaderPlugin = { fetch: (address: string) => Promise<TemplateRegistryEntry> | TemplateRegistryEntry };

const log: Logger = getLogger('fuse-box-aurelia-loader');


/**
* An implementation of the TemplateLoader interface implemented with text-based loading.
*/
export class TextTemplateLoader {
  /**
  * Loads a template.
  * @param loader The loader that is requesting the template load.
  * @param entry The TemplateRegistryEntry to load and populate with a template.
  * @return A promise which resolves when the TemplateRegistryEntry is loaded with a template.
  */
  public async loadTemplate(loader: Loader, entry: TemplateRegistryEntry) {
    const text = await loader.loadText(entry.address);
    entry.template = DOM.createTemplateFromMarkup(text);
  }
}


export function ensureOriginOnExports(moduleExports: any, moduleId: string) {
  let target = moduleExports;
  let key;
  let exportedValue;

  if (target.__useDefault) {
    target = target.default;
  }

  Origin.set(target, new Origin(moduleId, 'default'));

  if (typeof target === 'object') {
    // tslint:disable-next-line:forin
    for (key in target) {
      exportedValue = target[key];

      if (typeof exportedValue === 'function') {
        Origin.set(exportedValue, new Origin(moduleId, key));
      }
    }
  }

  return moduleExports;
}




/**
 * helper function during development
 *
 * @param {string} type
 * @param {string} title
 * @param {*} args
 */

declare var FuseBox: any;
function debugPrint(type: string, title: string, args: any) {
  if (type === 'error') {
    log.error(title, args);
  }

  if (type === 'info') {
    log.debug(title, args);
  }
}



/**
* A default implementation of the Loader abstraction which works with SystemJS, RequireJS and Dojo Loader.
*/
export class FuseBoxAureliaLoader extends Loader {
  /**
  * The name of the underlying native loader plugin used to load text.
  */
  public textPluginName = 'text';
  public loaderPlugins = Object.create(null);
  public moduleRegistry: any;
  public templateRegistry: any;
  public templateLoader: TextTemplateLoader;
  public modulesBeingLoaded = new Map<string, Promise<any>>();


  /**
  * Creates an instance of the DefaultLoader.
  */
  constructor() {
    super();
    this.moduleRegistry = Object.create(null);

    this.useTemplateLoader(new TextTemplateLoader());

    this.addPlugin('template-registry-entry', {
      'fetch': async (address: any) => {
        debugPrint('info', 'template-registry-entry- fetch =>', address);
        const entry = this.getOrCreateTemplateRegistryEntry(address);
        if (!entry.templateIsLoaded) {
          await this.templateLoader.loadTemplate(this, entry);
        }
        return entry;
      }
    });

  }



  /**
  * Instructs the loader to use a specific TemplateLoader instance for loading templates
  * @param templateLoader The instance of TemplateLoader to use for loading templates.
  */
  public useTemplateLoader(templateLoader: TextTemplateLoader) {
    this.templateLoader = templateLoader;
  }




  /**
  * Loads a collection of modules.
  * @param ids The set of module ids to load.
  * @return A Promise for an array of loaded modules.
  */
  public loadAllModules(ids: any): Promise<any> {
    debugPrint('info', 'loadAllModules => ', arguments);
    return Promise.all(
      ids.map(id => this.loadModule(id))
    );
  }



  /**
  * Loads a template.
  * @param url The url of the template to load.
  * @return A Promise for a TemplateRegistryEntry containing the template.
  */
  public loadTemplate(url: any): Promise<any> {
    debugPrint('info', 'loadTemplate => ', arguments);
    return this.loadModule(this.applyPluginToUrl(url, 'template-registry-entry'));
  }



  /**
  * Loads a text-based resource.
  * @param url The url of the text file to load.
  * @return A Promise for text content.
  */
  public loadText(url: any): Promise<any> {
    debugPrint('info', 'loadText => ', arguments);
    return Promise.resolve(this.loadWithFusebox(this.findFuseBoxPath(url))).then(textOrModule => {
      if (typeof textOrModule === 'string') {
        return textOrModule;
      }
      return textOrModule['default'];
    });

  }



  /**
  * Loads a module.
  * @param id The module id to normalize.
  * @return A Promise for the loaded module.
  */
  public async loadModule(moduleId: any) {
    debugPrint('info', 'loadModule => ', moduleId);
    let existing = this.moduleRegistry[moduleId];
    if (existing) {
      return existing;
    }

    let beingLoaded = this.modulesBeingLoaded.get(moduleId);
    if (beingLoaded) {
      return beingLoaded;
    }

    beingLoaded = this._import(moduleId);
    this.modulesBeingLoaded.set(moduleId, beingLoaded);
    const moduleExports = await beingLoaded;
    this.moduleRegistry[moduleId] = ensureOriginOnExports(moduleExports, moduleId);
    this.modulesBeingLoaded.delete(moduleId);
    return moduleExports;
  }



  /**
  * Registers a plugin with the loader.
  * @param pluginName The name of the plugin.
  * @param implementation The plugin implementation.
  */
  public addPlugin(pluginName: any, implementation: any) {
    this.loaderPlugins[pluginName] = implementation;
  }



  /**
  * Normalizes a module id.
  * @param moduleId The module id to normalize.
  * @param relativeTo What the module id should be normalized relative to.
  * @return A promise for the normalized module id.
  */
  public normalize(moduleId: any, relativeTo: any) {
    debugPrint('info', 'normalize =>', [moduleId, relativeTo]);
    return Promise.resolve(moduleId);
  }



  /**
  * Maps a module id to a source.
  * @param id The module id.
  * @param source The source to map the module to.
  */
  public map(id: any, source: any) {/*nothing*/ };



  public async _import(address: any): Promise<any> {

    const addressParts = address.split('!');
    const moduleId = addressParts.splice(addressParts.length - 1, 1)[0];
    const loaderPlugin = addressParts.length === 1 ? addressParts[0] : null;

    if (loaderPlugin) {
      const plugin = this.loaderPlugins[loaderPlugin];
      if (!plugin) {
        throw new Error(`Plugin ${loaderPlugin} is not registered in the loader.`);
      }
      return await plugin.fetch(moduleId);
    }

    // not loader plugin....
    let module = this.loadWithFusebox(this.findFuseBoxPath(moduleId));
    module = ensureOriginOnExports(module, moduleId);
    this.moduleRegistry[moduleId] = module;
    return Promise.resolve(module);


  }



  /**
  * Alters a module id so that it includes a plugin loader.
  * @param url The url of the module to load.
  * @param pluginName The plugin to apply to the module id.
  * @return The plugin-based module id.
  */
  public applyPluginToUrl(url: any, pluginName: any) {
    debugPrint('info', 'applyPluginToUrl =>', arguments);
    return `${pluginName}!${url}`;
  }



  /**
   * Uses fusebox to load file
   *
   * @param {*} args
   * @returns result
   *
   * @memberOf FuseBoxAureliaLoader
   */
  public loadWithFusebox(args: any): any {
    return FuseBox.import(args);
  }




  // temp fix for bug
  // todo: remove / test fix released
  public fuseBoxExist(id: any) {
    let result = false;
    try {
      result = FuseBox.exists(id);
    } catch (e) { result = false; }
    return result;
  }




  /**
   * finds the correct path FuseBox need to use to load module/file
   *
   * @private
   * @param {*} path to look for module/file
   * @returns string
   *
   * @memberOf FuseBoxAureliaLoader
   */
  private findFuseBoxPath(path: any): string {
    let retunValue;
    let modulePart;
    switch (true) {

      case path.indexOf('/') !== -1:

        // package path, lets test where it is
        modulePart = path.split('/')[0];
        switch (true) {
          case this.fuseBoxExist(path):
            retunValue = path;
            break;
          case this.fuseBoxExist('~/' + path):
            retunValue = '~/' + path;
            break;
          case this.fuseBoxExist(path.replace(modulePart, modulePart + '/dist/commonjs')):
            // workaround for commonjs path
            retunValue = path.replace(modulePart, modulePart + '/dist/commonjs');
            break;
          default:

            debugPrint('error', 'findFuseBoxPath() failed to find', arguments);
        }
        break;

      default:

        // default
        switch (true) {
          case this.fuseBoxExist(path):
            retunValue = path;
            break;
          case this.fuseBoxExist('~/' + path):
            retunValue = '~/' + path;
            break;
          default:
            debugPrint('error', 'findFuseBoxPath() failed to find', arguments);

        }
    }

    return retunValue;
  }


}



PLATFORM.Loader = FuseBoxAureliaLoader;

document.addEventListener("aurelia-started", () => {
  if ((<any>window).FUSEBOX_AURELIA_LOADER_HMR) {
    let container = Container.instance;
    let aurelia = container.get(Aurelia);
    let FuseBoxAureliaHmrPlugin = require('./fuse-box-aurelia-hmr-plugin').FuseBoxAureliaHmrPlugin;
    FuseBox.plugins.push(new FuseBoxAureliaHmrPlugin(aurelia.loader as any));
  }
};
