import { YMInitializer } from 'react-yandex-metrika';

import { InstallationProvider } from '@/stores/installation/view/InstallationProvider';
import { ManifestDynamic } from '@/stores/installation/view/ManifestDynamic';
import { CongratulationsProvider } from '@/stores/progress/view/Congratulations/CongratulationsProvider';
import { useConstant } from '@/utils/useConstant';

import { Stores, StoresContext } from './stores';
import { Layout } from './Layout/Layout';

export function App() {
  const stores = useConstant(() => new Stores());

  return (
    <StoresContext value={stores}>
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
    </StoresContext>
  );
}
