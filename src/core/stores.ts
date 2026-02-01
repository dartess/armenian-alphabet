import { use, createContext } from 'react';

import { ProgressStore } from '@/stores/progress/ProgressStore';
import { SettingsStore } from '@/stores/settings/SettingsStore';
import { InstallationStore } from '@/stores/installation/mobx/InstallationStore';

export class Stores {
  constructor() {
    this.progress = new ProgressStore();
    this.settings = new SettingsStore();
    this.installation = new InstallationStore(this.settings);
  }

  public readonly progress: ProgressStore;

  public readonly settings: SettingsStore;

  public readonly installation: InstallationStore;
}

const StoresContext = createContext<Stores | null>(null);

function useStore<T extends keyof Stores>(storeName: T): Stores[T] {
  const context = use(StoresContext);
  if (context) {
    return context[storeName];
  }
  throw Error('unknown store name');
}

export { useStore, StoresContext };
