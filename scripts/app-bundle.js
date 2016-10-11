define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
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
    };

    return App;
  }();
});
define('environment',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true,
    apiHost: '/api/'
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('api/api',['exports', 'regenerator-runtime', 'aurelia-framework', 'aurelia-fetch-client', '../environment'], function (exports, _regeneratorRuntime, _aureliaFramework, _aureliaFetchClient, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Api = undefined;

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Api = exports.Api = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function Api(httpClient) {
      _classCallCheck(this, Api);

      this.host = _environment2.default.apiHost;

      this.httpClient = httpClient;
    }

    Api.prototype.request = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2) {
        var method = _ref2.method;
        var path = _ref2.path;
        var body = _ref2.body;
        var response, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.httpClient.fetch('' + this.host + path, {
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  method: method,
                  body: JSON.stringify(body)
                });

              case 2:
                response = _context.sent;
                _context.next = 5;
                return response.json();

              case 5:
                json = _context.sent;
                return _context.abrupt('return', json);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function request(_x) {
        return _ref.apply(this, arguments);
      }

      return request;
    }();

    return Api;
  }()) || _class);
});
define('api/leaderboard',['exports', 'aurelia-framework', './api'], function (exports, _aureliaFramework, _api) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Leaderboard = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Leaderboard = exports.Leaderboard = (_dec = (0, _aureliaFramework.inject)(_api.Api), _dec(_class = function () {
    function Leaderboard(api) {
      _classCallCheck(this, Leaderboard);

      this.api = api;
    }

    Leaderboard.prototype.get = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', this.api.request({
                  method: 'get',
                  path: 'leaderboard'
                }));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get() {
        return _ref.apply(this, arguments);
      }

      return get;
    }();

    return Leaderboard;
  }()) || _class);
});
define('api/quizz',['exports', 'aurelia-framework', './api'], function (exports, _aureliaFramework, _api) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Quizz = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _dec, _class;

  var Quizz = exports.Quizz = (_dec = (0, _aureliaFramework.inject)(_api.Api, _aureliaFramework.BindingEngine, window.localStorage), _dec(_class = function () {
    _createClass(Quizz, [{
      key: 'current',
      get: function get() {
        try {
          return JSON.parse(this.storage._currentQuizz);
        } catch (e) {
          return null;
        }
      },
      set: function set(quizz) {
        if (quizz) {
          this.storage._currentQuizz = JSON.stringify(quizz);
        } else {
          this.storage.removeItem('_currentQuizz');
          this.responses.clear();
        }
      }
    }, {
      key: 'results',
      get: function get() {
        try {
          return JSON.parse(this.storage._currentResults);
        } catch (e) {
          return null;
        }
      },
      set: function set(results) {
        if (results) {
          this.storage._currentResults = JSON.stringify(results);
        } else {
          this.storage.removeItem('_currentResults');
          this.responses.clear();
        }
      }
    }]);

    function Quizz(api, bindingEngine, storage) {
      var _this = this;

      _classCallCheck(this, Quizz);

      this.responses = new Map();

      this.api = api;
      this.storage = storage;

      bindingEngine.collectionObserver(this.responses).subscribe(function (splices) {
        return _this.saveResponses(splices);
      });

      var responses = this.retreiveResponse();
      for (var _iterator = Object.keys(responses), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var key = _ref;

        this.responses.set(key, responses[key]);
      }
    }

    Quizz.prototype.retreiveResponse = function retreiveResponse() {
      try {
        return JSON.parse(this.storage._currentResponses);
      } catch (e) {
        return {};
      }
    };

    Quizz.prototype.saveResponses = function saveResponses(splices) {
      var responses = this.retreiveResponse();

      for (var _iterator2 = splices, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var splice = _ref2;

        responses[splice.key] = splice.object.get(splice.key);
      }
      this.storage._currentResponses = JSON.stringify(responses);
    };

    Quizz.prototype.init = function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref4) {
        var userName = _ref4.userName;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', this.api.request({
                  method: 'get',
                  path: 'quizz?userName=' + userName
                }));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init(_x) {
        return _ref3.apply(this, arguments);
      }

      return init;
    }();

    Quizz.prototype.getQuestion = function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_ref6) {
        var quizzId = _ref6.quizzId;
        var index = _ref6.index;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', this.api.request({
                  method: 'get',
                  path: 'quizz/' + quizzId + '/' + index
                }));

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getQuestion(_x2) {
        return _ref5.apply(this, arguments);
      }

      return getQuestion;
    }();

    Quizz.prototype.postAnswers = function () {
      var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt('return', this.api.request({
                  method: 'post',
                  path: 'quizz/' + this.current.id,
                  body: {
                    responses: Array.from(this.responses.values())
                  }
                }));

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function postAnswers() {
        return _ref7.apply(this, arguments);
      }

      return postAnswers;
    }();

    return Quizz;
  }()) || _class);
});
define('home/home',['exports', 'aurelia-framework', '../api/quizz', 'aurelia-router'], function (exports, _aureliaFramework, _quizz, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_quizz.Quizz, _aureliaRouter.Router), _dec(_class = function () {
    function Home(quizz, router) {
      _classCallCheck(this, Home);

      this.error = false;

      this.quizzService = quizz;
      this.router = router;
    }

    Home.prototype.submit = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var quizz;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.userName) {
                  _context.next = 3;
                  break;
                }

                this.error = true;
                return _context.abrupt('return');

              case 3:

                this.error = false;

                _context.next = 6;
                return this.quizzService.init({
                  userName: this.userName
                });

              case 6:
                quizz = _context.sent;

                this.quizzService.current = quizz;
                this.router.navigateToRoute('question', { index: 1 });

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function submit() {
        return _ref.apply(this, arguments);
      }

      return submit;
    }();

    Home.prototype.cancel = function cancel() {
      this.quizzService.current = null;
    };

    return Home;
  }()) || _class);
});
define('leaderboard/leaderboard',['exports', 'aurelia-framework', '../api/leaderboard', '../api/quizz', 'aurelia-router'], function (exports, _aureliaFramework, _leaderboard, _quizz, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Leaderboard = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Leaderboard = exports.Leaderboard = (_dec = (0, _aureliaFramework.inject)(_leaderboard.Leaderboard, _quizz.Quizz, _aureliaRouter.Router), _dec(_class = function () {
    function Leaderboard(leaderboardService, quizz, router) {
      _classCallCheck(this, Leaderboard);

      this.leaderboardService = leaderboardService;
      this.quizzService = quizz;
      this.router = router;
    }

    Leaderboard.prototype.activate = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.leaderboardService.get();

              case 2:
                this.leaderboard = _context.sent;

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function activate() {
        return _ref.apply(this, arguments);
      }

      return activate;
    }();

    Leaderboard.prototype.reset = function reset() {
      this.quizzService.current = null;
    };

    return Leaderboard;
  }()) || _class);
});
define('questions/question',['exports', 'aurelia-framework', '../api/quizz', 'aurelia-router'], function (exports, _aureliaFramework, _quizz, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Question = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Question = exports.Question = (_dec = (0, _aureliaFramework.inject)(_quizz.Quizz, _aureliaRouter.Router), _dec(_class = function () {
    function Question(quizz, router) {
      _classCallCheck(this, Question);

      this.loading = true;

      this.quizzService = quizz;
      this.router = router;
    }

    Question.prototype.activate = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(routeParams) {
        var _this = this;

        var quizz, responses, _iterator, _isArray, _i, _ref2, key, i;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.loading = true;
                quizz = this.quizzService.current;

                this.index = +routeParams.index - 1;

                if (!quizz) {
                  this.router.navigateToRoute('home');
                }

                responses = this.quizzService.current.questions[this.index];

                if (!responses) {
                  this.router.navigateToRoute('questions');
                }

                responses = responses.responses;

                this.responses = new Map();
                _iterator = Object.keys(responses), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();

              case 9:
                if (!_isArray) {
                  _context.next = 15;
                  break;
                }

                if (!(_i >= _iterator.length)) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt('break', 23);

              case 12:
                _ref2 = _iterator[_i++];
                _context.next = 19;
                break;

              case 15:
                _i = _iterator.next();

                if (!_i.done) {
                  _context.next = 18;
                  break;
                }

                return _context.abrupt('break', 23);

              case 18:
                _ref2 = _i.value;

              case 19:
                key = _ref2;

                this.responses.set(key, {
                  label: responses[key],
                  checked: false
                });

              case 21:
                _context.next = 9;
                break;

              case 23:
                _context.next = 25;
                return this.quizzService.getQuestion({
                  quizzId: this.quizzService.current.id,
                  index: this.index
                });

              case 25:
                this.question = _context.sent;
                i = new Image();

                i.setAttribute('src', this.question.url);
                i.addEventListener('load', function (e) {
                  _this.loading = false;
                });

              case 29:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function activate(_x) {
        return _ref.apply(this, arguments);
      }

      return activate;
    }();

    Question.prototype.respond = function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(index) {
        var responses, response, _iterator2, _isArray2, _i2, _ref4, r;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                responses = this.responses;
                response = responses.get(index);
                _iterator2 = responses, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();

              case 3:
                if (!_isArray2) {
                  _context2.next = 9;
                  break;
                }

                if (!(_i2 >= _iterator2.length)) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt('break', 17);

              case 6:
                _ref4 = _iterator2[_i2++];
                _context2.next = 13;
                break;

              case 9:
                _i2 = _iterator2.next();

                if (!_i2.done) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt('break', 17);

              case 12:
                _ref4 = _i2.value;

              case 13:
                r = _ref4;

                r.checked = false;

              case 15:
                _context2.next = 3;
                break;

              case 17:
                response.checked = true;

                this.quizzService.responses.set(this.index, response.label);

                if (!this.quizzService.current.questions[this.index + 1]) {
                  _context2.next = 23;
                  break;
                }

                this.router.navigateToRoute('question', { index: this.index + 2 });
                _context2.next = 27;
                break;

              case 23:
                _context2.next = 25;
                return this.quizzService.postAnswers();

              case 25:
                this.quizzService.results = _context2.sent;

                this.router.navigateToRoute('results');

              case 27:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function respond(_x2) {
        return _ref3.apply(this, arguments);
      }

      return respond;
    }();

    return Question;
  }()) || _class);
});
define('questions/questions',['exports', 'aurelia-framework', '../api/quizz', 'aurelia-router'], function (exports, _aureliaFramework, _quizz, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Questions = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _dec2, _class;

  var Questions = exports.Questions = (_dec = (0, _aureliaFramework.inlineView)('<template><div></div></template>'), _dec2 = (0, _aureliaFramework.inject)(_quizz.Quizz, _aureliaRouter.Router), _dec(_class = _dec2(_class = function () {
    function Questions(quizz, router) {
      _classCallCheck(this, Questions);

      this.quizzService = quizz;
      this.router = router;
    }

    Questions.prototype.activate = function activate() {
      if (!this.quizzService.current) {
        this.router.navigateToRoute('home');
        return;
      }
      if (this.quizzService.responses.size < this.quizzService.current.questions.length) {
        this.router.navigateToRoute('question', { index: this.quizzService.responses.size + 1 });
      } else {
        this.router.navigateToRoute('results');
      }
    };

    return Questions;
  }()) || _class) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('results/results',['exports', 'aurelia-framework', '../api/quizz', 'aurelia-router'], function (exports, _aureliaFramework, _quizz, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Results = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Results = exports.Results = (_dec = (0, _aureliaFramework.inject)(_quizz.Quizz, _aureliaRouter.Router), _dec(_class = function () {
    function Results(quizz, router) {
      _classCallCheck(this, Results);

      this.quizzService = quizz;
      this.router = router;
    }

    Results.prototype.activate = function activate() {
      if (!this.quizzService.current || !this.quizzService.results) {
        this.router.navigateToRoute('home');
        return;
      }
      this.questionsCount = this.quizzService.current.questions.length;
      this.score = this.quizzService.results.score;
      this.duration = this.quizzService.results.duration;
    };

    return Results;
  }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n<require\n  from=\"./app.css\"></require>\n<header\n  class=\"main-header\">\n  <h1>Quizz Monkey!</h1>\n  <nav>\n    <a\n      route-href=\"route: leaderboard\">\n      Leaderboard\n    </a>\n  </nav>\n</header>\n<div\n  class=\"main-view-ctn\">\n  <router-view></router-view>\n</div>\n</template>\n"; });
define('text!app.css', ['module'], function(module) { module.exports = "html,\nbody {\n  font-size: 10px;\n  margin: 0;\n  padding: 0;\n  font-family: 'Happy Monkey', sans-serif;\n  height: 100%; }\n\n.main-header {\n  height: 6rem;\n  line-height: 6rem;\n  background-color: #f4e6bd;\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#f4e6bd), to(#87a775));\n  background-image: -webkit-linear-gradient(top, #f4e6bd, #87a775);\n  background-image: -moz-linear-gradient(top, #f4e6bd, #87a775);\n  background-image: -o-linear-gradient(top, #f4e6bd, #87a775);\n  background-image: -ms-linear-gradient(top, #f4e6bd, #87a775);\n  background-image: linear-gradient(top, #f4e6bd, #87a775); }\n  .main-header h1 {\n    margin: 0;\n    padding-left: 2rem; }\n  .main-header nav {\n    position: absolute;\n    top: 0;\n    right: 1rem; }\n    .main-header nav a {\n      font-size: 2rem;\n      color: white;\n      text-decoration: none; }\n\n.main-view-ctn {\n  display: table;\n  width: 100%;\n  height: 100%; }\n\nrouter-view {\n  display: table-cell;\n  width: 100%;\n  height: 100%;\n  text-align: center;\n  vertical-align: middle; }\n\nbutton {\n  background-color: #88ab7a;\n  border: none;\n  border-radius: 1rem;\n  padding: 1rem;\n  box-shadow: 0 1rem 0 #4f6447;\n  transition: transform .1s ease-in, box-shadow .1s ease-in;\n  outline: none;\n  cursor: pointer; }\n  button:active {\n    box-shadow: 0 2px 0 #4f6447;\n    transform: translate3d(0, 1rem, 0); }\n  button.has-error {\n    box-shadow: 0 1rem 0 #714f33; }\n    button.has-error:active {\n      box-shadow: 0 2px 0 #714f33; }\n"; });
define('text!home/home.html', ['module'], function(module) { module.exports = "<template>\n<require\n  from=\"./home.css\"></require>\n<div\n  class=\"home-view\">\n  <form\n    submit.delegate=\"submit()\"\n    if.bind=\"!quizzService.current\">\n    <p>Choose a userName</p>\n    <input\n      value.bind=\"userName\">\n    <p>\n      and<br>\n      <button\n        class=\"${error ? 'has-error' : ''}\"\n        type=\"submit\">start the quizz!</button>\n    </p>\n  </form>\n  <div\n    if.bind=\"quizzService.current\">\n    Quizz en cours\n    <a\n      href=\"/questions\">Continuer</a>\n    <button\n      click.delegate=\"cancel()\">Arreter</button>\n  </div>\n</div>\n</template>\n"; });
define('text!home/home.css', ['module'], function(module) { module.exports = ".home-view {\n  font-size: 4rem; }\n  .home-view input,\n  .home-view button {\n    font-size: 4rem; }\n"; });
define('text!leaderboard/leaderboard.html', ['module'], function(module) { module.exports = "<template>\n<require\n  from=\"./leaderboard.css\"></require>\n<div\n  class=\"leaderboard-view\">\n  <h2>Best players!!</h2>\n  <table>\n    <thead>\n      <tr>\n        <th>Name</th>\n        <th>Score</th>\n        <th>Duration</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr\n        repeat.for=\"player of leaderboard\">\n        <td>${player.userName}</td>\n        <td>${player.score}</td>\n        <td>${player.duration}</td>\n      </tr>\n    </tbody>\n  </table>\n  <p>\n    <a\n      route-href=\"route: home\"\n      click.delegate=\"reset()\">Play again?</a>\n  </p>\n</div>\n</template>\n"; });
define('text!leaderboard/leaderboard.css', ['module'], function(module) { module.exports = ".leaderboard-view {\n  font-size: 4rem; }\n  .leaderboard-view table {\n    max-width: 60rem;\n    margin: 0 auto; }\n"; });
define('text!questions/question.html', ['module'], function(module) { module.exports = "<template>\n<require\n  from=\"./question.css\"></require>\n<section\n  class=\"question\">\n  <div\n    if.bind=\"loading\">\n    <p>Wait for it…</p>\n  </div>\n  <div\n    if.bind=\"!loading\">\n    <figure>\n      <img\n        src.bind=\"question.url\">\n      <figcaption>${question.attribution}</figcaption>\n    </figure>\n\n    <ul>\n      <li\n        repeat.for=\"[k, response] of responses\">\n        <label\n          click.delegate=\"respond(k)\">\n          <input\n            type=\"checkbox\"\n            checked.bind=\"response.checked\">\n          ${response.label}\n        </label>\n      </li>\n    </ul>\n  </div>\n</section>\n</template>\n"; });
define('text!questions/question.css', ['module'], function(module) { module.exports = ".question figure {\n  max-width: 40rem;\n  margin: 0 auto; }\n\n.question img {\n  max-width: 100%; }\n\n.question ul {\n  list-style: none;\n  max-width: 60rem;\n  margin: 0 auto;\n  font-size: 3rem;\n  text-align: left; }\n"; });
define('text!results/results.html', ['module'], function(module) { module.exports = "<template>\n<require\n  from=\"./results.css\"></require>\n<div\n  class=\"results-view\">\n  <p\n    class=\"score\">Score: ${score}/${questionsCount}</p>\n  <p>Duration: ${duration}s</p>\n  <p>\n    <a\n      route-href=\"route: leaderboard\">\n      See all results\n    </a>\n  </p>\n</div>\n</template>\n"; });
define('text!results/results.css', ['module'], function(module) { module.exports = ".results-view {\n  font-size: 5rem; }\n  .results-view .score {\n    font-weight: bold; }\n"; });
//# sourceMappingURL=app-bundle.js.map