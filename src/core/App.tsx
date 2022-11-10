import React, { useState } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { ConfirmProvider } from 'material-ui-confirm';

import { Layout } from '@/components/Layout/Layout';

import { Stores, StoresProvider } from './stores';
import { ThemeProvider } from './ThemeProvider';

function App() {
  const [stores] = useState(() => new Stores());

  return (
    <StoresProvider value={stores}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider>
          <ConfirmProvider>
            <Layout />
          </ConfirmProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </StoresProvider>
  );
}

export default App;
