import { action, computed, makeObservable, observable } from 'mobx';

import type { InstallationStoreImplementation } from '../model';

type BeforeInstallPromptEvent = WindowEventMap['beforeinstallprompt'];

const IS_SUPPORT_BEFORE_INSTALL_PROMPT = 'BeforeInstallPromptEvent' in window;

let deferredInstallPromptEvent: BeforeInstallPromptEvent | null = null;

export class InstallationNativeStore implements InstallationStoreImplementation {
  constructor() {
    makeObservable(this);

    window.addEventListener('beforeinstallprompt', this.handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', this.handleAppInstalled);

    // this.checkInstalledRelatedApps();
  }

  @computed public get canBeInstalled() {
    return this.canBeInstalledByEvent && this.canBeInstalledByRelatedApps;
  }

  @observable private canBeInstalledByRelatedApps = true;

  @observable private canBeInstalledByEvent = Boolean(deferredInstallPromptEvent);

  @action private setIsCanBeInstalledByEvent = (value: boolean) => {
    this.canBeInstalledByEvent = value;
  };

  private handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
    event.preventDefault();
    deferredInstallPromptEvent = event;
    this.setIsCanBeInstalledByEvent(true);
  };

  private handleAppInstalled = () => {
    deferredInstallPromptEvent = null;
    this.setIsCanBeInstalledByEvent(false);
  };

  public showInstallPrompt = () => {
    if (!deferredInstallPromptEvent) {
      this.setIsCanBeInstalledByEvent(false);
      return;
    }
    deferredInstallPromptEvent.prompt().then(result => {
      console.log('prompt() result', result)
    });
  };

  // private checkInstalledRelatedApps() {
  // navigator
  //   .getInstalledRelatedApps?.()
  //   .then((apps) => {
  //     if (apps.length > 0) {
  //       runInAction(() => {
  //         this.canBeInstalledByRelatedApps = false;
  //       });
  //     }
  //   })
  //   .catch(() => {
  // no action required
  // });
  // }

  public static listenEvents() {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      deferredInstallPromptEvent = event;
    });
    window.addEventListener('appinstalled', () => {
      deferredInstallPromptEvent = null;
    });
  }

  public static isSupported() {
    return IS_SUPPORT_BEFORE_INSTALL_PROMPT;
  }
}
