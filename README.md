# fuse-box-aurelia-loader

###How to install
```npm install git://github.com/fuse-box/fuse-box-aurelia-loader```

###Sample
```javascript

// optional..
(<any>window).FUSEBOX_AURELIA_LOADER_LOGGING = true; // activate logging (when aurelia developmentLogging is used)
(<any>window).FUSEBOX_AURELIA_LOADER_HMR = true; // activate hot reload (need aurelia-hot-module-reload to work)
(<any>window).FUSEBOX_AURELIA_LOADER_RELOAD = true; // just reload document on fusebox hrm event (file change)

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
