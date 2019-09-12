
(window as any).FUSEBOX_AURELIA_LOADER_LOGGING = true;

//import all modules you need
import "fuse-box-aurelia-loader";
import "aurelia-bootstrapper";
import "aurelia-pal-browser";
import "aurelia-logging-console";
import "aurelia-templating-binding";
import "aurelia-templating-resources";
import "aurelia-event-aggregator";
import "aurelia-history-browser";
import "aurelia-templating-router";
import { Aurelia } from "aurelia-framework";

// all scripts/files you want to use need to be imported
import "./app";
import './app.html'

export async function configure(aurelia: Aurelia) {
  aurelia.use.standardConfiguration().developmentLogging();
  await aurelia.start();
  await aurelia.setRoot("src/app");
}
