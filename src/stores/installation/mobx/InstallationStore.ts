import { computed, observable, autorun, runInAction } from 'mobx';
import type { WebAppManifest } from 'web-app-manifest';

import { PLATFORM_ENV } from '@/utils/envPlatform';
import type { SettingsStore } from '@/stores/settings/SettingsStore';

import type { InstallationImplementationKind, InstallationStoreImplementation } from '../model';

import { InstallationIosStore } from './InstallationIosStore';
import { InstallationNativeStore } from './InstallationNativeStore';

export class InstallationStore {
  constructor(private readonly settings: SettingsStore) {
    const stores = [
      {
        Store: InstallationNativeStore,
        kind: 'native',
      },
      {
        Store: InstallationIosStore,
        kind: 'iOS',
      },
    ] as const;

    const supportedStoreData = stores.find(({ Store }) => Store.isSupported());

    if (supportedStoreData) {
      this.implementation = new supportedStoreData.Store(this.settings);
      this.implementationKind = supportedStoreData.kind;
    }

    autorun(() => {
      if (!this.manifestUrl) {
        runInAction(() => {
          this.manifest = null;
        });
        return;
      }
      fetch(this.manifestUrl)
        .then((response) => response.json() as WebAppManifest)
        .then((manifest) => {
          runInAction(() => {
            this.manifest = manifest;
          });
        });
    });
  }

  private implementation?: InstallationStoreImplementation;

  public implementationKind?: InstallationImplementationKind;

  @computed
  public get canBeInstalled(): boolean {
    return this.implementation?.canBeInstalled ?? false;
  }

  @computed
  public get isShowCustomInstallPrompt(): boolean {
    return this.implementation?.isShowCustomInstallPrompt ?? false;
  }

  @computed
  public get manifestUrl(): string | null {
    if (!PLATFORM_ENV) {
      return null;
    }
    const { appTheme } = this.settings;
    return `/pwa/generated-manifests/manifest-${appTheme}-${PLATFORM_ENV}.json`;
  }

  @observable public accessor manifest: WebAppManifest | null = null;

  public showInstallPrompt = (): void => {
    this.implementation?.showInstallPrompt();
  };

  public hideInstallPrompt = (): void => {
    this.implementation?.hideInstallPrompt?.();
  };

  public static listenEvents(): void {
    if (InstallationNativeStore.isSupported()) {
      InstallationNativeStore.listenEvents();
    }
  }
}
