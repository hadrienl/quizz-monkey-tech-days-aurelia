export class App {
  configureRouter(config, router) {
    config.title = 'Quizz Monkey!';
    config.options.pushState = true;
    config.map([{
      route: '/',
      name: 'home',
      moduleId: 'home/home'
    }, {
      route: '/questions',
      name: 'questions',
      moduleId: 'questions/questions'
    }, {
      route: '/question/:index',
      name: 'question',
      moduleId: 'questions/question'
    }, {
      route: '/results',
      name: 'results',
      moduleId: 'results/results'
    }, {
      route: '/leaderboard',
      name: 'leaderboard',
      moduleId: 'leaderboard/leaderboard'
    }]);
    router.handleUnknownRoutes({
      redirect: '/'
    });
    this.router = router;
  }
}
