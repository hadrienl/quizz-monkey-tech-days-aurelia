import {inject} from 'aurelia-framework';
import {Quizz} from '../api/quizz';
import {Router} from 'aurelia-router';

@inject(Quizz, Router)
export class Results {
  constructor(quizz, router) {
    this.quizzService = quizz;
    this.router = router;
  }

  activate() {
    if (!this.quizzService.current ||
        !this.quizzService.results) {
      this.router.navigateToRoute('home');
      return;
    }
    this.questionsCount = this.quizzService.current.questions.length;
    this.score = this.quizzService.results.score;
    this.duration = this.quizzService.results.duration;
  }
}
