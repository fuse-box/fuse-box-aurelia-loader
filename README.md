# fuse-box-aurelia-loader


### Note

Some features of Fusebox can not be used with this Aurelia loader
 * [rollup](http://fuse-box.org/page/rollup)
 * [quantum](http://fuse-box.org/page/quantum)
 * [code splitting](http://fuse-box.org/page/code-splitting)

Some of these might get added later, feel free to make PR to make these work.


### How to install
```npm install fuse-box-aurelia-loader```


### How to use

```javascript

// optional..
// activate logging (when aurelia developmentLogging is used)
// have this as optional, since it prints out a lot.
window.FUSEBOX_AURELIA_LOADER_LOGGING = true; 


//These can also be set by using the "EnvPlugin" in fuse build setup
// EnvPlugin({ 
//    FB_AU_LOG: false,
//})

// TIP: If you are having issues check console for FuseBox.import("process").env to make sure it set
// See "autoLoadAureliaLoaders" in next code block in injecting during bundle



// The next 2 import statements can be replaced by plugin in your fuse build setup
// See "autoLoadAureliaLoaders" in next code block
// add custom loader for fuse
import 'fuse-box-aurelia-loader';
// start aurelia bootstrapper
import 'aurelia-bootstrapper';


// aurelia configuration
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()

  aurelia.start().then(() => aurelia.setRoot());
}
```


### Plugin sample
Simple auto load plugin to inject the loaders

```javascript
var autoLoadAureliaLoaders =function() {
    var loader = function(){}
    loader.prototype.init = function(context) {}
    loader.prototype.bundleEnd = function(context) {
        context.source.addContent(`FuseBox.import("fuse-box-aurelia-loader")`);
        context.source.addContent(`FuseBox.import("aurelia-bootstrapper")`);
    }
    return new loader();
}
```

Want browser to refresh when u make edits? (important!!! need hmr() and cache(true) on app bundle)
``` javascript
var autoReload = function (production) {
    var autoReload = function () {}
    autoReload.prototype.init = function () { }
    autoReload.prototype.bundleEnd = function () {
        context.source.addContent(`
            const customizedHMRPlugin = {
                hmrUpdate: ({ type, path, content }) => {
                    console.log("reload plugin trigger")
                        location.reload();
                        return true;
                }
            }
            console.log("adding reload plugin")
            if(!window.addedPlug){
                console.log("added reload plugin")
                window.addedPlug = true;
                FuseBox.addPlugin(customizedHMRPlugin);
            }
            `);
    }
    return new autoReload(production);
}

```


### How to develop/improve loader
 * run `node setup` to to npm install in root and sample folder
 * run `gulp watch` to start sample
 * run `gulp build` to create new build
