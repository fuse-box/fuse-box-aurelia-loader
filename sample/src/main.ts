
//Todo, figure out why we are missing entry
//https://github.com/fuse-box/fuse-box-aurelia-loader/issues/5
// debugger // enable to see issue
// FuseBox.packages["fuse-box-aurelia-loader"] <- missing entry
// FuseBox.packages["aurelia-v-grid"] <- missing entry
FuseBox.pkg("fuse-box-aurelia-loader", {}, function(___scope___: any) {
        ___scope___.entry = "fuse-box-aurelia-loader.js"
});

FuseBox.pkg("aurelia-v-grid", {}, function(___scope___: any) {
        ___scope___.entry = 'index.js'
});






// add custom loader for fuse
// window.FUSEBOX_AURELIA_LOADER_LOGGING=true
import 'fuse-box-aurelia-loader'


// start aurelia bootstrapper
import 'aurelia-bootstrapper';
import {Aurelia} from 'aurelia-framework';



// aurelia configuration
export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-v-grid')

  aurelia.start().then(() => aurelia.setRoot());
}
