import {Container, BindingEngine} from 'aurelia-framework';
import {Quizz} from '../../../src/api/quizz';

describe('Quizz', () => {
  let container = new Container();
  let api;
  let storage;
  let quizz;

  beforeEach(() => {
    api = {
      request: jasmine.createSpy('request')
    };
    storage = {
      removeItem: jasmine.createSpy('removeItem')
    };
    quizz = new Quizz(api, container.get(BindingEngine), storage);
  });

  it('should set current quizz', () => {
    quizz.current = {foo: 'bar'};
    expect(storage._currentQuizz).toEqual('{"foo":"bar"}');
  });

  it('should get current quizz', () => {
    storage._currentQuizz = '{"foo":"bar"}';
    expect(quizz.current).toEqual({foo: 'bar'});
  });

  it('should init a quizz', () => {
    quizz.init({ userName: 'foo' });
    expect(api.request).toHaveBeenCalledWith({
      method: 'get',
      path: 'quizz?userName=foo'
    });
  });

  it('should get a question', () => {
    quizz.getQuestion({ quizzId: '42', index: 1 });
    expect(api.request).toHaveBeenCalledWith({
      method: 'get',
      path: 'quizz/42/1'
    });
  });

  it('should post answers', () => {
    quizz.responses.set(1, 'foo');
    quizz.responses.set(2, 'bar');
    quizz.current = {id: '42'};
    quizz.postAnswers();
    expect(api.request).toHaveBeenCalledWith({
      method: 'post',
      path: 'quizz/42',
      body: {
        responses: ['foo', 'bar']
      }
    });
  });
});
