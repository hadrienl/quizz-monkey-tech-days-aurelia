export class App {
  configureRouter(config, router) {
    config.title = 'Quizz Monkey!';
    config.options.pushState = true;
    config.map([{
      route: '/',
      name: 'home',
      moduleId: 'home/home'
    }]);
    router.handleUnknownRoutes({
      redirect: '/'
    });
    this.router = router;
  }
}
