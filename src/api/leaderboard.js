import {inject} from 'aurelia-framework';
import {Api} from './api';

@inject(Api)
export class Leaderboard {
  constructor(api) {
    this.api = api;
  }

  async get() {
    return this.api.request({
      method: 'get',
      path: 'leaderboard'
    });
  }
}
