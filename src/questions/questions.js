import {inject, inlineView} from 'aurelia-framework';
import {Quizz} from '../api/quizz';
import {Router} from 'aurelia-router';

@inlineView('<template><div></div></template>')
@inject(Quizz, Router)
export class Questions {
  constructor(quizz, router) {
    this.quizzService = quizz;
    this.router = router;
  }

  activate() {
    if (!this.quizzService.current) {
      this.router.navigateToRoute('home');
      return;
    }
    if (this.quizzService.responses.size < this.quizzService.current.questions.length) {
      this.router.navigateToRoute('question', { index: this.quizzService.responses.size + 1 });
    } else {
      this.router.navigateToRoute('results');
    }
  }
}
