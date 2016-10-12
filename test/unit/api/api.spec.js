import {Api} from '../../../src/api/api';

describe('Api', () => {
  let httpClient = {
    fetch: jasmine.createSpy('get')
  };
  let api;

  beforeEach(() => {
    api = new Api(httpClient, '/api-test');
  });

  it('should request server', () => {
    api.request({
      method: 'get',
      path: '/some/cool/path'
    });
    expect(httpClient.fetch).toHaveBeenCalledWith('/api-test/some/cool/path', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'get'
    });
  });
});
