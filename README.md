# fuse-box-aurelia-loader

* todo...
* this is not ready for use


```javascript
// add custom loader for fuse
(<any>window).FUSEBOX_AURELIA_LOADER_LOGGING = true; // activate very active logging when aurelia developmentLogging is used
(<any>window).FUSEBOX_AURELIA_LOADER_HMR = true; // active hot reload
(<any>window).FUSEBOX_AURELIA_LOADER_RELOAD = true; // just reload document on changes
import 'fuse-box-aurelia-loader';

// start aurelia bootstrapper
import 'aurelia-bootstrapper';


// aurelia configuration
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin("aurelia-v-grid");

  aurelia.start().then(() => aurelia.setRoot());
}
```