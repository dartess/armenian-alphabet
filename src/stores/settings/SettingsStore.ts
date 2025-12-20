import { observable, makeObservable, action, computed } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import type { DisplayMode, Theme, UserTheme } from '@/types/model';

const isTwaAtAppInit = document.referrer.startsWith('android-app://');

export class SettingsStore {
  constructor() {
    makeObservable(this);

    makePersistable(this, { name: 'SettingsStore', properties: ['userTheme'] });

    this.mediaPrefersColorSchemeDark.addEventListener('change', this.handleChangeSystemPrefersColorSchemeDark);

    this.standaloneMatchMedia.addEventListener('change', this.handleStandaloneChange);
  }

  @observable
  public userTheme: UserTheme = 'system';

  @action
  public setUserTheme = (userTheme: UserTheme) => {
      this.userTheme = userTheme;
    };

  private mediaPrefersColorSchemeDark = window.matchMedia('(prefers-color-scheme: dark)');

  @observable
  private isSystemPrefersColorSchemeDark: boolean = this.mediaPrefersColorSchemeDark.matches;

  @action
  private handleChangeSystemPrefersColorSchemeDark = () => {
      this.isSystemPrefersColorSchemeDark = this.mediaPrefersColorSchemeDark.matches;
    };

  @computed
  public get appTheme(): Theme {
    if (this.userTheme !== 'system') {
      return this.userTheme;
    }
    return this.isSystemPrefersColorSchemeDark ? 'dark' : 'light';
  }

  private standaloneMatchMedia = window.matchMedia('(display-mode: standalone)');

  public displayMode: DisplayMode = (() => {
    if (isTwaAtAppInit) {
      return 'twa';
    }
    if (this.standaloneMatchMedia.matches) {
      return 'standalone';
    }
    return 'browser';
  })();

  private handleStandaloneChange = (event: MediaQueryListEvent) => {
    this.displayMode = event.matches ? 'standalone' : 'browser';
  };
}
