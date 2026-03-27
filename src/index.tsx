import '@/core/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { configurePersistable } from 'mobx-persist-store';

import { App } from '@/core/App';
import { sentryInit } from '@/utils/sentryInit';
import { safeLocalStorage } from '@/utils/safeLocalStorage';
import { InstallationStore } from '@/stores/installation/mobx/InstallationStore';

if (process.env.NODE_ENV === 'production') {
  sentryInit();
}

configurePersistable({ storage: safeLocalStorage });

InstallationStore.listenEvents();

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister());
  });
}
