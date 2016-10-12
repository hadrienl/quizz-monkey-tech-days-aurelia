import {Leaderboard} from '../../../src/api/leaderboard';

describe('Leaderboard', () => {
  let api;
  let leaderboard;

  beforeEach(() => {
    api = {
      request: jasmine.createSpy('request')
    };
    leaderboard = new Leaderboard(api);
  });

  it('should load leaderboard', () => {
    leaderboard.get();
    expect(api.request).toHaveBeenCalledWith({
      method: 'get',
      path: 'leaderboard'
    });
  });
});
