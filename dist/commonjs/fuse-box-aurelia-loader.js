var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var aurelia_metadata_1 = require("aurelia-metadata");
var aurelia_loader_1 = require("aurelia-loader");
var aurelia_loader_default_1 = require("aurelia-loader-default");
var aurelia_pal_1 = require("aurelia-pal");
var aurelia_logging_1 = require("aurelia-logging");
var log = aurelia_logging_1.getLogger('fuse-box-aurelia-loader');
function ensureOriginOnExports(executed, name) {
    var target = executed;
    var key;
    var exportedValue;
    if (target.__useDefault) {
        target = target['default'];
    }
    aurelia_metadata_1.Origin.set(target, new aurelia_metadata_1.Origin(name, 'default'));
    for (key in target) {
        exportedValue = target[key];
        if (typeof exportedValue === 'function') {
            aurelia_metadata_1.Origin.set(exportedValue, new aurelia_metadata_1.Origin(name, key));
        }
    }
    return executed;
}
function debugPrint(type, title, args) {
    if (window.FUSEBOX_AURELIA_LOADER_LOGGING) {
        if (type === 'error') {
            log.error(title, args);
        }
        if (type === 'info') {
            log.debug(title, args);
        }
    }
}
var FuseBoxAureliaLoader = (function (_super) {
    __extends(FuseBoxAureliaLoader, _super);
    function FuseBoxAureliaLoader() {
        var _this = _super.call(this) || this;
        _this.textPluginName = 'text';
        _this.loaderPlugins = Object.create(null);
        _this.moduleRegistry = Object.create(null);
        _this.templateRegistry = Object.create(null);
        _this.useTemplateLoader(new aurelia_loader_default_1.TextTemplateLoader());
        var that = _this;
        _this.addPlugin('template-registry-entry', {
            'fetch': function (address) {
                debugPrint('info', 'template-registry-entry- fetch =>', address);
                var entry = that.getOrCreateTemplateRegistryEntry(address);
                return entry.templateIsLoaded ? entry : that.templateLoader.loadTemplate(that, entry).then(function () { return entry; });
            }
        });
        return _this;
    }
    FuseBoxAureliaLoader.prototype.useTemplateLoader = function (templateLoader) {
        this.templateLoader = templateLoader;
    };
    FuseBoxAureliaLoader.prototype.loadAllModules = function (ids) {
        debugPrint('info', 'loadAllModules => ', arguments);
        var loads = [];
        for (var i = 0, ii = ids.length; i < ii; ++i) {
            var item = ids[i];
            if (item.endsWith('.html')) {
                loads.push(this._import(item));
            }
            else {
                loads.push(this.loadModule(item));
            }
        }
        return Promise.all(loads);
    };
    FuseBoxAureliaLoader.prototype.loadTemplate = function (url) {
        var _this = this;
        debugPrint('info', 'loadTemplate => ', arguments);
        if (this.templateRegistry[url]) {
            return Promise.resolve(this.templateRegistry[url]);
        }
        return this._import(this.applyPluginToUrl(url, 'template-registry-entry')).then(function (template) {
            _this.moduleRegistry[url] = template;
            _this.templateRegistry[url] = template;
            return template;
        });
    };
    FuseBoxAureliaLoader.prototype.loadText = function (url) {
        debugPrint('info', 'loadText => ', arguments);
        return Promise.resolve(this.loadWithFusebox(this.findFuseBoxPath(url))).then(function (textOrModule) {
            if (typeof textOrModule === 'string') {
                return textOrModule;
            }
            return textOrModule['default'];
        });
    };
    FuseBoxAureliaLoader.prototype.loadModule = function (id) {
        debugPrint('info', 'loadModule => ', arguments);
        var module = this.loadWithFusebox(this.findFuseBoxPath(id));
        module = ensureOriginOnExports(module, id);
        this.moduleRegistry[id] = module;
        return Promise.resolve(module);
    };
    FuseBoxAureliaLoader.prototype.addPlugin = function (pluginName, implementation) {
        debugPrint('info', 'loadModule => ', arguments);
        if (!this.loaderPlugins[pluginName]) {
            this.loaderPlugins[pluginName] = implementation;
        }
    };
    FuseBoxAureliaLoader.prototype.normalize = function (moduleId, relativeTo) {
        debugPrint('info', 'normalize =>', [moduleId, relativeTo]);
        return Promise.resolve(moduleId);
    };
    FuseBoxAureliaLoader.prototype.map = function (id, source) {
        debugPrint('info', 'map =>', [id, source]);
    };
    FuseBoxAureliaLoader.prototype._import = function (address) {
        var addressParts = address.split('!');
        var moduleId = addressParts.splice(addressParts.length - 1, 1)[0];
        var loaderPlugin = addressParts.length === 1 ? addressParts[0] : null;
        if (loaderPlugin) {
            var plugin = this.loaderPlugins[loaderPlugin];
            if (!plugin) {
                throw new Error("Plugin " + loaderPlugin + " is not registered in the loader.");
            }
            return Promise.resolve(plugin.fetch(moduleId));
        }
        return null;
    };
    FuseBoxAureliaLoader.prototype.applyPluginToUrl = function (url, pluginName) {
        debugPrint('info', 'applyPluginToUrl =>', arguments);
        return pluginName + "!" + url;
    };
    FuseBoxAureliaLoader.prototype.loadWithFusebox = function (args) {
        return FuseBox.import(args);
    };
    FuseBoxAureliaLoader.prototype.fuseBoxExist = function (id) {
        var result = false;
        try {
            result = FuseBox.exists(id);
        }
        catch (e) {
            result = false;
        }
        return result;
    };
    FuseBoxAureliaLoader.prototype.findFuseBoxPath = function (path) {
        var retunValue;
        var modulePart;
        switch (true) {
            case path.indexOf('html-resource-plugin!') === 0:
                retunValue = path;
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
            default:
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
    };
    return FuseBoxAureliaLoader;
}(aurelia_loader_1.Loader));
exports.FuseBoxAureliaLoader = FuseBoxAureliaLoader;
aurelia_pal_1.PLATFORM.Loader = FuseBoxAureliaLoader;
