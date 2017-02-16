import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'FuseBox-Aurelia-loader';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: './routes/welcome',      nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',        moduleId: './routes/users',        nav: true, title: 'Github Users' },
      { route: 'child-router',  name: 'child-router', moduleId: './routes/child-router', nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}
