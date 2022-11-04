import React, { useState } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Layout } from "@/components/Layout/Layout";
import { Stores, StoresProvider } from "@/core/stores";

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
          <Layout/>
        </StoresProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
