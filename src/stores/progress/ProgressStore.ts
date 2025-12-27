import { observable, action, computed, autorun, runInAction } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import type { LetterState, LetterType, TotalProgress } from '@/types/model';
import { alphabet } from '@/constants/alphabet';
import { fireOnceEvent } from '@/utils/fireOnceEvent';
import { reachGoal } from '@/utils/reachGoal';

export class ProgressStore {
  constructor() {
    makePersistable(this, { name: 'ProgressStore', properties: ['totalProgress'] });

    autorun(() => {
      if (!this.isProgressCompleted) {
        return;
      }
      fireOnceEvent('progressCompleted', () => {
        runInAction(() => {
          this.isShowCongratulations = true;
          reachGoal('progressTotalComplete');
        });
      });
    });
  }

  @observable
  public accessor totalProgress: TotalProgress = ProgressStore.getInitialProgress();

  @observable
  public accessor isShowCongratulations = false;

  @action
  public setLetterProgress = (letter: LetterType, state: LetterState) => {
    this.totalProgress[letter.lowercase] = state;

    switch (state) {
      case 'progress':
        reachGoal('progressLetterStart', { letter: letter.lowercase });
        break;
      case 'done':
        reachGoal('progressLetterEnd', { letter: letter.lowercase });
        break;
      // no default
    }
  };

  @action
  public resetProgress = () => {
    this.totalProgress = ProgressStore.getInitialProgress();
  };

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
}
