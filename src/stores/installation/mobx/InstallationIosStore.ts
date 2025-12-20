import { action, makeObservable, observable } from 'mobx';

import type { SettingsStore } from '@/stores/settings/SettingsStore';
import { IS_IOS } from '@/utils/envPlatform';

import type { InstallationStoreImplementation } from '../model';

export class InstallationIosStore implements InstallationStoreImplementation {
  constructor(private readonly settings: SettingsStore) {
    makeObservable(this);
  }

  @observable public canBeInstalled = this.settings.displayMode === 'browser';

  @observable public isShowCustomInstallPrompt = false;

  @action private setIsShowCustomInstallPrompt = (value: boolean): void => {
    this.isShowCustomInstallPrompt = value;
  };

  public showInstallPrompt = (): void => {
    this.setIsShowCustomInstallPrompt(true)
  };

  public hideInstallPrompt = (): void => {
    this.setIsShowCustomInstallPrompt(false)
  };

  public static isSupported() {
    return IS_IOS;
  }
}
