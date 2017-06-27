# fuse-box-aurelia-loader

###How to install
```npm install git://github.com/fuse-box/fuse-box-aurelia-loader```


###Sample

```javascript

// optional..
// activate logging (when aurelia developmentLogging is used)
window.FUSEBOX_AURELIA_LOADER_LOGGING = true; 


//These can also be set by using the "EnvPlugin" in fuse.
//fb.EnvPlugin({ 
//    FB_AU_LOG: false,
//})

// if you are having issues check console for FuseBox.import("process").env to make sure it set


// the next 2 import statements can be replaced by plugin, see "autoLoadAureliaLoaders" in next code block
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