import React from 'react';
import ReactDOM from 'react-dom/client';

import '@/core/index.css';
import App from '@/core/App';
import { fixIOsVh } from '@/core/vh';

fixIOsVh();

const root = ReactDOM.createRoot(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- честное слово (TODO после Sentry)
  document.getElementById('root')!,
);
root.render(
  <App />,
);
