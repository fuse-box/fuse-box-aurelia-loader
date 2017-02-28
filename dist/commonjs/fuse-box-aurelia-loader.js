var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_metadata_1 = require("aurelia-metadata");
var aurelia_loader_1 = require("aurelia-loader");
var aurelia_pal_1 = require("aurelia-pal");
var aurelia_logging_1 = require("aurelia-logging");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var aurelia_framework_1 = require("aurelia-framework");
var fuse_box_aurelia_hmr_plugin_1 = require("./fuse-box-aurelia-hmr-plugin");
var log = aurelia_logging_1.getLogger('fuse-box-aurelia-loader');
var TextTemplateLoader = (function () {
    function TextTemplateLoader() {
    }
    TextTemplateLoader.prototype.loadTemplate = function (loader, entry) {
        return __awaiter(this, void 0, void 0, function () {
            var text;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loader.loadText(entry.address)];
                    case 1:
                        text = _a.sent();
                        entry.template = aurelia_pal_1.DOM.createTemplateFromMarkup(text);
                        return [2 /*return*/];
                }
            });
        });
    };
    return TextTemplateLoader;
}());
exports.TextTemplateLoader = TextTemplateLoader;
function ensureOriginOnExports(moduleExports, moduleId) {
    var target = moduleExports;
    var key;
    var exportedValue;
    if (target.__useDefault) {
        target = target.default;
    }
    aurelia_metadata_1.Origin.set(target, new aurelia_metadata_1.Origin(moduleId, 'default'));
    if (typeof target === 'object') {
        for (key in target) {
            exportedValue = target[key];
            if (typeof exportedValue === 'function') {
                aurelia_metadata_1.Origin.set(exportedValue, new aurelia_metadata_1.Origin(moduleId, key));
            }
        }
    }
    return moduleExports;
}
exports.ensureOriginOnExports = ensureOriginOnExports;
function debugPrint(type, title, args) {
    if (type === 'error') {
        log.error(title, args);
    }
    if (type === 'info') {
        log.debug(title, args);
    }
}
var FuseBoxAureliaLoader = (function (_super) {
    __extends(FuseBoxAureliaLoader, _super);
    function FuseBoxAureliaLoader() {
        var _this = _super.call(this) || this;
        _this.textPluginName = 'text';
        _this.loaderPlugins = Object.create(null);
        _this.modulesBeingLoaded = new Map();
        _this.moduleRegistry = Object.create(null);
        _this.useTemplateLoader(new TextTemplateLoader());
        _this.addPlugin('template-registry-entry', {
            'fetch': function (address) { return __awaiter(_this, void 0, void 0, function () {
                var entry;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            debugPrint('info', 'template-registry-entry- fetch =>', address);
                            entry = this.getOrCreateTemplateRegistryEntry(address);
                            if (!!entry.templateIsLoaded) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.templateLoader.loadTemplate(this, entry)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/, entry];
                    }
                });
            }); }
        });
        return _this;
    }
    FuseBoxAureliaLoader.prototype.useTemplateLoader = function (templateLoader) {
        this.templateLoader = templateLoader;
    };
    FuseBoxAureliaLoader.prototype.loadAllModules = function (ids) {
        var _this = this;
        debugPrint('info', 'loadAllModules => ', arguments);
        return Promise.all(ids.map(function (id) { return _this.loadModule(id); }));
    };
    FuseBoxAureliaLoader.prototype.loadTemplate = function (url) {
        debugPrint('info', 'loadTemplate => ', arguments);
        return this.loadModule(this.applyPluginToUrl(url, 'template-registry-entry'));
    };
    FuseBoxAureliaLoader.prototype.loadText = function (url) {
        debugPrint('info', 'loadText => ', arguments);
        return Promise.resolve(this.loadWithFusebox(this.findFuseBoxPath(url))).then(function (textOrModule) {
            if (typeof textOrModule === 'string') {
                return textOrModule;
            }
            if (textOrModule['default']) {
                return textOrModule['default'];
            }
            else {
                return '';
            }
        });
    };
    FuseBoxAureliaLoader.prototype.loadModule = function (moduleId) {
        return __awaiter(this, void 0, void 0, function () {
            var existing, beingLoaded, moduleExports;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debugPrint('info', 'loadModule => ', moduleId);
                        existing = this.moduleRegistry[moduleId];
                        if (existing) {
                            return [2 /*return*/, existing];
                        }
                        beingLoaded = this.modulesBeingLoaded.get(moduleId);
                        if (beingLoaded) {
                            return [2 /*return*/, beingLoaded];
                        }
                        beingLoaded = this._import(moduleId);
                        this.modulesBeingLoaded.set(moduleId, beingLoaded);
                        return [4 /*yield*/, beingLoaded];
                    case 1:
                        moduleExports = _a.sent();
                        this.moduleRegistry[moduleId] = ensureOriginOnExports(moduleExports, moduleId);
                        this.modulesBeingLoaded.delete(moduleId);
                        return [2 /*return*/, moduleExports];
                }
            });
        });
    };
    FuseBoxAureliaLoader.prototype.addPlugin = function (pluginName, implementation) {
        this.loaderPlugins[pluginName] = implementation;
    };
    FuseBoxAureliaLoader.prototype.normalize = function (moduleId, relativeTo) {
        debugPrint('info', 'normalize =>', [moduleId, relativeTo]);
        return Promise.resolve(moduleId);
    };
    FuseBoxAureliaLoader.prototype.map = function () { };
    ;
    FuseBoxAureliaLoader.prototype._import = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var addressParts, moduleId, loaderPlugin, plugin, module;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addressParts = address.split('!');
                        moduleId = addressParts.splice(addressParts.length - 1, 1)[0];
                        loaderPlugin = addressParts.length === 1 ? addressParts[0] : null;
                        if (!loaderPlugin) return [3 /*break*/, 2];
                        plugin = this.loaderPlugins[loaderPlugin];
                        if (!plugin) {
                            throw new Error("Plugin " + loaderPlugin + " is not registered in the loader.");
                        }
                        return [4 /*yield*/, plugin.fetch(moduleId)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        module = this.loadWithFusebox(this.findFuseBoxPath(moduleId));
                        module = ensureOriginOnExports(module, moduleId);
                        this.moduleRegistry[moduleId] = module;
                        return [2 /*return*/, Promise.resolve(module)];
                }
            });
        });
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
            case path.indexOf('/') !== -1:
                modulePart = path.split('/')[0];
                switch (true) {
                    case this.fuseBoxExist(path):
                        retunValue = path;
                        break;
                    case this.fuseBoxExist('~/' + path):
                        retunValue = '~/' + path;
                        break;
                    default:
                        var moduleId = Object.keys(FuseBox.packages)
                            .find(function (name) { return path.startsWith(name + "/"); });
                        if (moduleId) {
                            var resources = Object.keys(FuseBox.packages[moduleId].f);
                            var resourceName_1 = path.replace(moduleId + "/", '');
                            var resourceEntry = resources.find(function (r) { return r.endsWith(resourceName_1 + '.js'); });
                            retunValue = moduleId + "/" + resourceEntry;
                        }
                        if (!this.fuseBoxExist(retunValue)) {
                            debugPrint('error', 'findFuseBoxPath() failed to find', arguments);
                        }
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
document.addEventListener('aurelia-started', function () {
    if (window.FUSEBOX_AURELIA_LOADER_HMR || window.FUSEBOX_AURELIA_LOADER_RELOAD) {
        var container = aurelia_dependency_injection_1.Container.instance;
        var aurelia = container.get(aurelia_framework_1.Aurelia);
        FuseBox.plugins.push(new fuse_box_aurelia_hmr_plugin_1.FuseBoxAureliaHmrPlugin(aurelia.loader, window.FUSEBOX_AURELIA_LOADER_RELOAD));
    }
});
