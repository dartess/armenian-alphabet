import { useContext, createContext } from 'react';

import { ProgressStore } from "@/stores/ProgressStore";

export class Stores {
  constructor() {
    this.progress = new ProgressStore();
  }

  readonly progress: ProgressStore;
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
