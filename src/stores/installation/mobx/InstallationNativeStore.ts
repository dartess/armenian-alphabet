import { action, computed, observable } from 'mobx';

import type { InstallationStoreImplementation } from '../model';

type BeforeInstallPromptEvent = WindowEventMap['beforeinstallprompt'];

const IS_SUPPORT_BEFORE_INSTALL_PROMPT = 'BeforeInstallPromptEvent' in window;

let deferredInstallPromptEvent: BeforeInstallPromptEvent | null = null;

export class InstallationNativeStore implements InstallationStoreImplementation {
  constructor() {
    window.addEventListener('beforeinstallprompt', this.handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', this.handleAppInstalled);

    // this.checkInstalledRelatedApps();
  }

  @computed
  public get canBeInstalled(): boolean {
    return this.canBeInstalledByEvent && this.canBeInstalledByRelatedApps;
  }

  @observable
  private accessor canBeInstalledByRelatedApps = true;

  @observable
  private accessor canBeInstalledByEvent = Boolean(deferredInstallPromptEvent);

  @action
  private setIsCanBeInstalledByEvent = (value: boolean) => {
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

  public showInstallPrompt = (): void => {
    if (!deferredInstallPromptEvent) {
      this.setIsCanBeInstalledByEvent(false);
      return;
    }
    deferredInstallPromptEvent.prompt();
  };

  public static listenEvents(): void {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      deferredInstallPromptEvent = event;
    });
    window.addEventListener('appinstalled', () => {
      deferredInstallPromptEvent = null;
    });
  }

  public static isSupported(): boolean {
    return IS_SUPPORT_BEFORE_INSTALL_PROMPT;
  }
}
