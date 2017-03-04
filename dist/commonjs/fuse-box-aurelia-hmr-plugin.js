Object.defineProperty(exports, "__esModule", { value: true });
var FuseBoxAureliaHmrPlugin = (function () {
    function FuseBoxAureliaHmrPlugin(loader, reloadPageOnly) {
        if (!reloadPageOnly) {
            var HmrContext = require('aurelia-hot-module-reload').HmrContext;
            this.context = new HmrContext(loader);
            this.loader = loader;
        }
        this.reloadPageOnly = reloadPageOnly;
    }
    FuseBoxAureliaHmrPlugin.prototype.hmrUpdate = function (data) {
        if (this.reloadPageOnly) {
            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                document.location.reload();
            }, 250);
        }
        else {
            if (data.type === 'js') {
                FuseBox.flush();
                FuseBox.dynamic(data.path, data.content);
                if (FuseBox.mainFile) {
                    FuseBox.import(FuseBox.mainFile);
                }
                if (data.path.indexOf('.html') >= 0) {
                    this.context.handleViewChange(data.path);
                    return true;
                }
                else {
                    if (data.path.indexOf('.css') >= 0) {
                        this.loader.moduleRegistry[data.path] = true;
                        this.context.reloadCss(data.path);
                        return true;
                    }
                    else {
                        var moduleId = data.path.substr(0, data.path.length - 3);
                        this.context.handleModuleChange(moduleId, {});
                        return true;
                    }
                }
            }
        }
        return false;
    };
    return FuseBoxAureliaHmrPlugin;
}());
exports.FuseBoxAureliaHmrPlugin = FuseBoxAureliaHmrPlugin;
