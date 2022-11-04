import React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Layout } from "@/components/Layout/Layout";

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
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Layout/>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
