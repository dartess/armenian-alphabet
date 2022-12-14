import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { configurePersistable } from 'mobx-persist-store';

import { serviceWorkerRegister } from '@/core/serviceWorkerRegistration';
import { App } from '@/core/App';
import { fixIOsVh } from '@/core/vh';
import { sentryInit } from '@/utils/sentryInit';
import { safeLocalStorage } from '@/utils/safeLocalStorage';
import { InstallationStore } from '@/stores/installation/mobx/InstallationStore';
import '@/core/index.css';

if (process.env.NODE_ENV === 'production') {
  sentryInit();
}

fixIOsVh();

configurePersistable({ storage: safeLocalStorage });

InstallationStore.listenEvents();

const root = createRoot(document.getElementById('root')!);
root.render(<StrictMode><App /></StrictMode>);
serviceWorkerRegister();
