import { Origin } from 'aurelia-metadata';
import { Loader } from 'aurelia-loader';
import { TextTemplateLoader } from 'aurelia-loader-default';
import { PLATFORM } from 'aurelia-pal';
import {getLogger, Logger} from 'aurelia-logging';

const log: Logger = getLogger('fuse-box-aurelia-loader');

function ensureOriginOnExports(executed: any, name: any) {
  let target = executed;
  let key;
  let exportedValue;

  if (target.__useDefault) {
    target = target['default'];
  }

  Origin.set(target, new Origin(name, 'default'));

  // tslint:disable-next-line:forin
  for (key in target) {
    exportedValue = target[key];

    if (typeof exportedValue === 'function') {
      Origin.set(exportedValue, new Origin(name, key));
    }
  }

  return executed;
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
  public templateLoader: any;


  /**
  * Creates an instance of the DefaultLoader.
  */
  constructor() {
    super();
    this.moduleRegistry = Object.create(null);
    this.templateRegistry = Object.create(null);
    this.useTemplateLoader(new TextTemplateLoader());

    let that = this;

    this.addPlugin('template-registry-entry', {
      'fetch': function (address: any) {
        debugPrint('info', 'template-registry-entry- fetch =>', address);
        let entry = that.getOrCreateTemplateRegistryEntry(address);
        return entry.templateIsLoaded ? entry : that.templateLoader.loadTemplate(that, entry).then(() => entry);
      }
    });

  }



  /**
  * Instructs the loader to use a specific TemplateLoader instance for loading templates
  * @param templateLoader The instance of TemplateLoader to use for loading templates.
  */
  public useTemplateLoader(templateLoader: any) {
    this.templateLoader = templateLoader;
  }



  /**
  * Loads a collection of modules.
  * @param ids The set of module ids to load.
  * @return A Promise for an array of loaded modules.
  */
  public loadAllModules(ids: any): Promise<any> {
    debugPrint('info', 'loadAllModules => ', arguments);
    let loads = [];

    for (let i = 0, ii = ids.length; i < ii; ++i) {
      let item = ids[i];
      if (item.endsWith('.html')) {
        loads.push(this._import(item));
      } else {
        loads.push(this.loadModule(item));
      }

    }

    return Promise.all(loads);
  }



  /**
  * Loads a template.
  * @param url The url of the template to load.
  * @return A Promise for a TemplateRegistryEntry containing the template.
  */
  public loadTemplate(url: any): Promise<any> {
    debugPrint('info', 'loadTemplate => ', arguments);
    if(this.templateRegistry[url]) {
      return Promise.resolve(this.templateRegistry[url]);
    }
    return this._import(this.applyPluginToUrl(url, 'template-registry-entry')).then((template: any) => {
      this.moduleRegistry[url] = template;
      this.templateRegistry[url] = template;
      return template;
    });
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
    })

  }



  /**
  * Loads a module.
  * @param id The module id to normalize.
  * @return A Promise for the loaded module.
  */
  public loadModule(id: any) {
    debugPrint('info', 'loadModule => ', arguments);
    let module = this.loadWithFusebox(this.findFuseBoxPath(id));
    module = ensureOriginOnExports(module, id);
    this.moduleRegistry[id] = module;
    return Promise.resolve(module);
  }



  /**
  * Registers a plugin with the loader.
  * @param pluginName The name of the plugin.
  * @param implementation The plugin implementation.
  */
  public addPlugin(pluginName: any, implementation: any) {
    debugPrint('info', 'loadModule => ', arguments);
    if (!this.loaderPlugins[pluginName]) {
      this.loaderPlugins[pluginName] = implementation;
    }

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
  public map(id: any, source: any) {
    debugPrint('info', 'map =>', [id, source]);
  }



  public _import(address: any): any {
    const addressParts = address.split('!');
    const moduleId = addressParts.splice(addressParts.length - 1, 1)[0];
    const loaderPlugin = addressParts.length === 1 ? addressParts[0] : null;

    if (loaderPlugin) {
      const plugin = this.loaderPlugins[loaderPlugin];
      if (!plugin) {
        throw new Error(`Plugin ${loaderPlugin} is not registered in the loader.`);
      }
      return Promise.resolve(plugin.fetch(moduleId));
    }
    // throw new Error(`Unable to find module with ID: ${moduleId}`);
    return null;
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


      case path.indexOf('html-resource-plugin!') === 0:
        retunValue = path; // this should never trigger loadmodule should catch this...
        debugPrint('error', 'WHY!', arguments);
        break;


      case path.indexOf('css-resource-plugin!') === 0:

        path = path.replace('css-resource-plugin!', '');

        modulePart = path.split('/')[0];

        switch (true) {
          case this.fuseBoxExist(path):
            retunValue = path;
            break;
          case this.fuseBoxExist('~/' + path):
            retunValue = '~/' + path;
            break;
          case this.fuseBoxExist(path.replace(modulePart, modulePart + '/dist/commonjs')):
            retunValue = path.replace(modulePart, modulePart + '/dist/commonjs');
            break;
          default:
            debugPrint('error', 'findFuseBoxPath() failed to find', arguments);
        }
        break;


      case path.indexOf('/') !== -1:

        // package path, lets test where it is
        modulePart = path.split('/')[0];
        switch (true) {
          case this.fuseBoxExist(path):// exsist sometimes fails...
            retunValue = path;
            break;
          case this.fuseBoxExist('~/' + path):
            retunValue = '~/' + path;
            break;
          case this.fuseBoxExist(path.replace(modulePart, modulePart + '/dist/commonjs')):
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
