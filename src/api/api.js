import runtime from 'regenerator-runtime';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import environment from '../environment';

@inject(HttpClient, environment.apiHost)
export class Api {
  constructor(httpClient, apiHost) {
    this.httpClient = httpClient;
    this.host = apiHost;
  }

  async request({ method, path, body }) {
    const params = {
      headers: {
        'Content-Type': 'application/json'
      },
      method
    };
    if (body) {
      params.body = JSON.stringify(body);
    }
    const response = await this.httpClient.fetch(`${this.host}${path}`, params);
    const json = await response.json();
    return json;
  }
}
