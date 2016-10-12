import {inject, BindingEngine} from 'aurelia-framework';
import {Api} from './api';

@inject(Api, BindingEngine, window.localStorage)
export class Quizz {

  responses = new Map();

  get current() {
    try {
      return JSON.parse(this.storage._currentQuizz);
    } catch (e) {
      return null;
    }
  }

  set current(quizz) {
    if (quizz) {
      this.storage._currentQuizz = JSON.stringify(quizz);
    } else {
      this.storage.removeItem('_currentQuizz');
      this.responses.clear();
    }
  }

  get results() {
    try {
      return JSON.parse(this.storage._currentResults);
    } catch (e) {
      return null;
    }
  }

  set results(results) {
    if (results) {
      this.storage._currentResults = JSON.stringify(results);
    } else {
      this.storage.removeItem('_currentResults');
      this.responses.clear();
    }
  }

  constructor(api, bindingEngine, storage) {
    this.api = api;
    this.storage = storage;

    bindingEngine.collectionObserver(this.responses).subscribe(splices => this.saveResponses(splices));

    const responses = this.retreiveResponse();
    for (let key of Object.keys(responses)) {
      this.responses.set(key, responses[key]);
    }
  }

  retreiveResponse() {
    try {
      return JSON.parse(this.storage._currentResponses);
    } catch (e) {
      return {};
    }
  }
  saveResponses(splices) {
    const responses = this.retreiveResponse();

    for (let splice of splices) {
      responses[splice.key] = splice.object.get(splice.key);
    }
    this.storage._currentResponses = JSON.stringify(responses);
  }

  async init({ userName }) {
    return this.api.request({
      method: 'get',
      path: `quizz?userName=${userName}`
    });
  }

  async getQuestion({ quizzId, index }) {
    return this.api.request({
      method: 'get',
      path: `quizz/${quizzId}/${index}`
    });
  }

  async postAnswers() {
    return this.api.request({
      method: 'post',
      path: `quizz/${this.current.id}`,
      body: {
        responses: Array.from(this.responses.values())
      }
    });
  }
}
