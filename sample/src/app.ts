import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Aurelia';
        config.map([
            { route: ['', 'welcome'], name: 'welcome', moduleId: './routes/welcome', nav: true, title: 'Fusebox Aurelia Seed' },
            { route: 'aurelia-materialize-bridge', name: 'mat-bridge', moduleId: './routes/mat-bridge', nav: true, title: 'Materialize-Bridge' },
            { route: 'aurelia-kendoui-bridge', name: 'kendo-bridge', moduleId: './routes/kendo-bridge', nav: true, title: 'KendoUi-Bridge' },
            { route: 'v-grid', name: 'v-grid', moduleId: './routes/v-grid', nav: true, title: 'V-Grid' }
        ]);

        this.router = router;
    }
}
