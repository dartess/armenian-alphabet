import React, { useState } from 'react';
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles';
import { ConfirmProvider } from 'material-ui-confirm';

import { Layout } from '@/components/Layout/Layout';
import { Stores, StoresProvider } from '@/core/stores';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff8f00',
      light: '#ffc046',
      dark: '#c56000',
      contrastText: '#000000',
    },
    secondary: {
      light: '#f8fdff',
      main: '#c5cae9',
      dark: '#9499b7',
      contrastText: '#000000',
    },
  },
});

function App() {
  const [stores] = useState(() => new Stores());

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <StoresProvider value={stores}>
          <ConfirmProvider>
            <Layout />
          </ConfirmProvider>
        </StoresProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
