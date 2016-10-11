import {inject} from 'aurelia-framework';
import {Quizz} from '../api/quizz';
import {Router} from 'aurelia-router';

@inject(Quizz, Router)
export class Home {
  error = false;

  constructor(quizz, router) {
    this.quizzService = quizz;
    this.router = router;
  }

  async submit() {
    if (!this.userName) {
      this.error = true;
      return;
    }

    this.error = false;

    const quizz = await this.quizzService.init({
      userName: this.userName
    });
    this.quizzService.current = quizz;
    console.log(quizz);
  }

  cancel() {
    this.quizzService.current = null;
  }
}
