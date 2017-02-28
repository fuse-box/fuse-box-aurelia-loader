

// add custom loader for fuse
(<any>window).FUSEBOX_AURELIA_LOADER_LOGGING = true;
(<any>window).FUSEBOX_AURELIA_LOADER_HMR = true;
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
