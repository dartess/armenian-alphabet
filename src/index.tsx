import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { serviceWorkerRegister } from '@/core/serviceWorkerRegistration';
import { App } from '@/core/App';
import { fixIOsVh } from '@/core/vh';
import '@/core/index.css';

fixIOsVh();

const root = createRoot(document.getElementById('root')!);
root.render(<StrictMode><App /></StrictMode>);
serviceWorkerRegister();
