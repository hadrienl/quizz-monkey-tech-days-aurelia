import {inject} from 'aurelia-framework';
import {Leaderboard as LeaderboardService} from '../api/leaderboard';
import {Quizz} from '../api/quizz';
import {Router} from 'aurelia-router';

@inject(LeaderboardService, Quizz, Router)
export class Leaderboard {
  constructor(leaderboardService, quizz, router) {
    this.leaderboardService = leaderboardService;
    this.quizzService = quizz;
    this.router = router;
  }

  async activate() {
    this.leaderboard = await this.leaderboardService.get();
  }

  reset() {
    this.quizzService.current = null;
  }
}
