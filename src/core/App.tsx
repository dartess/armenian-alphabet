import React, { useState } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { ConfirmProvider } from 'material-ui-confirm';

import { InstallationProvider } from '@/stores/installation/view/InstallationProvider';
import { ManifestDynamic } from '@/stores/installation/view/ManifestDynamic';

import { Stores, StoresProvider } from './stores';
import { ThemeProvider } from './ThemeProvider';
import { Layout } from './Layout/Layout';

export function App() {
  const [stores] = useState(() => new Stores());

  return (
    <StoresProvider value={stores}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider>
          <ConfirmProvider>
            <Layout />
            <ManifestDynamic />
            <InstallationProvider />
          </ConfirmProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </StoresProvider>
  );
}
