import React from 'react';
import ReactDOM from 'react-dom/client';

import * as serviceWorkerRegistration from '@/core/serviceWorkerRegistration';
import '@/core/index.css';
import App from '@/core/App';
import { fixIOsVh } from '@/core/vh';

fixIOsVh();

const root = ReactDOM.createRoot(
  document.getElementById('root')!,
);
root.render(
  <App />,
);
serviceWorkerRegistration.register();
