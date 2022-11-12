import { observable, makeObservable, action, reaction, computed, autorun, runInAction } from 'mobx';

import type { LetterState, LetterType, TotalProgress } from '@/types/model';
import { alphabet } from '@/constants/alphabet';
import { fireOnceEvent } from '@/utils/fireOnceEvent';

export class ProgressStore {
  constructor() {
    makeObservable(this);

    reaction(
      () => JSON.stringify(this.totalProgress),
      (progress) => localStorage.setItem(ProgressStore.LOCALSTORAGE_KEY, progress),
    );

    autorun(
      () => {
        if (!this.isProgressCompleted) {
          return;
        }
        fireOnceEvent('progressCompleted', () => {
          runInAction(() => {
            this.isShowCongratulations = true;
          });
        });
      },
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

  @observable
  public isShowCongratulations = false;

  @action.bound
  public setLetterProgress(letter: LetterType, state: LetterState) {
    this.totalProgress[letter.lowercase] = state;
  }

  @action.bound
  public resetProgress() {
    this.totalProgress = ProgressStore.getInitialProgress();
  }

  @computed
  public get progressCounts() {
    const items = Object.values(this.totalProgress);
    const newCount = items.filter((item) => item === 'new').length;
    const progressCount = items.filter((item) => item === 'progress').length;
    const doneCount = items.filter((item) => item === 'done').length;
    return {
      newCount,
      progressCount,
      doneCount,
    };
  }

  @computed
  public get hasProgress() {
    return this.progressCounts.progressCount > 0 || this.progressCounts.doneCount > 0;
  }

  @computed
  public get isProgressCompleted() {
    return this.progressCounts.newCount === 0 && this.progressCounts.progressCount === 0;
  }

  private static getInitialProgress(): TotalProgress {
    return Object.fromEntries(alphabet.map((letter) => [letter.lowercase, 'new']));
  }

  private static LOCALSTORAGE_KEY = 'totalProgress';
}
