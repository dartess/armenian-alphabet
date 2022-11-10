import { observable, makeObservable, action, reaction, computed } from 'mobx';

import type { Theme, UserTheme } from '@/types/model';

export class SettingsStore {
  constructor() {
    makeObservable(this);

    this.mediaPrefersColorSchemeDark.addEventListener('change', this.handleChangeSystemPrefersColorSchemeDark);

    reaction(
      () => this.userTheme,
      (userTheme) => localStorage.setItem(SettingsStore.LOCALSTORAGE_KEY_THEME, userTheme),
    );
  }

  @observable
  public userTheme: UserTheme = (() => {
      const userThemeFromStorage = localStorage.getItem(SettingsStore.LOCALSTORAGE_KEY_THEME);
      return (userThemeFromStorage ?? 'system') as UserTheme;
    })();

  @action.bound
  public setUserTheme = (userTheme: UserTheme) => {
      this.userTheme = userTheme;
    };

  private mediaPrefersColorSchemeDark = window.matchMedia('(prefers-color-scheme: dark)');

  @observable
  private isSystemPrefersColorSchemeDark: boolean = this.mediaPrefersColorSchemeDark.matches;

  @action.bound
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

  private static LOCALSTORAGE_KEY_THEME = 'userTheme';
}
