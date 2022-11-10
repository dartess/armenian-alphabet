import { useContext, createContext } from 'react';

import { ProgressStore } from '@/stores/ProgressStore';
import { SettingsStore } from '@/stores/SettingsStore';

export class Stores {
  constructor() {
    this.progress = new ProgressStore();
    this.settings = new SettingsStore();
  }

  public readonly progress: ProgressStore;

  public readonly settings: SettingsStore;
}

const storesContext = createContext<Stores | null>(null);
const StoresProvider = storesContext.Provider;

function useStore<T extends keyof Stores>(storeName: T) {
  const context = useContext(storesContext);
  if (context) {
    return context[storeName];
  }
  throw Error('unknown store name');
}

export { useStore, StoresProvider };
