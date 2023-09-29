import { useState } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { ConfirmProvider } from 'material-ui-confirm';
import { YMInitializer } from 'react-yandex-metrika';

import { InstallationProvider } from '@/stores/installation/view/InstallationProvider';
import { ManifestDynamic } from '@/stores/installation/view/ManifestDynamic';
import { CongratulationsProvider } from '@/stores/progress/view/Congratulations/CongratulationsProvider';

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
            <CongratulationsProvider />
            <YMInitializer
              accounts={[91393608]}
              options={{
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true,
              }}
              version="2"
            />
          </ConfirmProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </StoresProvider>
  );
}
