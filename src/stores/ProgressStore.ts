import {
  observable, makeObservable, action, reaction,
} from 'mobx';
import { LetterState, LetterType, TotalProgress } from '@/types/model';
import { alphabet } from '@/constants/alphabet';

export class ProgressStore {
  constructor() {
    makeObservable(this);

    reaction(
      () => JSON.stringify(this.totalProgress),
      (progress) => localStorage.setItem(ProgressStore.LOCALSTORAGE_KEY, progress),
    );
  }

  @observable
  public totalProgress: TotalProgress = (() => {
      const totalProgressFromStorage = localStorage.getItem(ProgressStore.LOCALSTORAGE_KEY);
      if (totalProgressFromStorage) {
        return JSON.parse(totalProgressFromStorage);
      }
      return ProgressStore.getInitialProgress();
    })();

  @action.bound
  public setLetterProgress(letter: LetterType, state: LetterState) {
    this.totalProgress[letter.lowercase] = state;
  }

  @action.bound
  public resetProgress() {
    this.totalProgress = ProgressStore.getInitialProgress();
  }

  private static getInitialProgress(): TotalProgress {
    return Object.fromEntries(alphabet.map((letter) => [letter.lowercase, 'new']));
  }

  private static LOCALSTORAGE_KEY = 'totalProgress';
}
