import {inject} from 'aurelia-framework';
import {Quizz} from '../api/quizz';
import {Router} from 'aurelia-router';

@inject(Quizz, Router)
export class Question {
  loading = true;

  constructor(quizz, router) {
    this.quizzService = quizz;
    this.router = router;
  }

  async activate(routeParams) {
    this.loading = true;
    const quizz = this.quizzService.current;
    this.index = +routeParams.index - 1;

    if (!quizz) {
      this.router.navigateToRoute('home');
    }

    let responses = this.quizzService.current.questions[this.index];
    if (!responses) {
      this.router.navigateToRoute('questions');
    }

    responses = responses.responses;

    this.responses = new Map();
    for (let key of Object.keys(responses)) {
      this.responses.set(key, {
        label: responses[key],
        checked: false
      });
    }

    this.question = await this.quizzService.getQuestion({
      quizzId: this.quizzService.current.id,
      index: this.index
    });

    // Preload image
    const i = new Image();
    i.setAttribute('src', this.question.url);
    i.addEventListener('load', e => {
      this.loading = false;
    });
  }

  async respond(index) {
    const responses = this.responses;
    const response = responses.get(index);
    for (let r of responses) {
      r.checked = false;
    }
    response.checked = true;

    this.quizzService.responses.set(this.index, response.label);

    if (this.quizzService.current.questions[this.index + 1]) {
      this.router.navigateToRoute('question', { index: this.index + 2 });
    } else {
      this.quizzService.results = await this.quizzService.postAnswers();
      this.router.navigateToRoute('results');
    }
  }
}
