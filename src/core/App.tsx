import React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

import { Layout } from "@/components/Layout/Layout";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Layout />
    </StyledEngineProvider>
  );
}

export default App;
