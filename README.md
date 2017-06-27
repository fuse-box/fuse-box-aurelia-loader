# fuse-box-aurelia-loader

### How to install
```npm install git://github.com/fuse-box/fuse-box-aurelia-loader```


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


### How to develop/improve loader
 * run `node setup` to to npm install in root and sample folder
 * run `gulp watch` to start sample
 * run `gulp build` to create new build