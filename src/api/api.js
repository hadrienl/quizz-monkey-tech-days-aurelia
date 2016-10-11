import runtime from 'regenerator-runtime';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import environment from '../environment';

@inject(HttpClient)
export class Api {
  host = environment.apiHost;

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async request({ method, path, body }) {
    const response = await this.httpClient.fetch(`${this.host}${path}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method,
      body: JSON.stringify(body)
    });
    const json = await response.json();
    return json;
  }
}
