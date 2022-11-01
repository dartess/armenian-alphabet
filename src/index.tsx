import React from 'react';
import ReactDOM from 'react-dom/client';

import '@/core/index.css';
import App from '@/core/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);

console.log('hello from actions 3')
