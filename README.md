# fuse-box-aurelia-loader

###How to install
```npm install git://github.com/fuse-box/fuse-box-aurelia-loader```

###Sample
```javascript

// optional..
// activate logging (when aurelia developmentLogging is used)
(<any>window).FUSEBOX_AURELIA_LOADER_LOGGING = true; 

// activate hot reload, need aurelia-hot-module-reload to work, and "useCache" needs to be set to true
(<any>window).FUSEBOX_AURELIA_LOADER_HMR = true; 

// just reload document on fusebox hrm event (file change)
(<any>window).FUSEBOX_AURELIA_LOADER_RELOAD = true; 

//These can also be set by using the "EnvPlugin" in fuse.
//fb.EnvPlugin({ 
//    FB_AU_LOG: false,
//    FB_AU_HMR: false,
//    FB_AU_RELOAD: true 
//})

// if you are having issues check console for FuseBox.import("process").env to make sure it set




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


