import { observer } from 'mobx-react-lite';

import { useStore } from '@/core/stores';
import { lazyfy } from '@/utils/lazyfy';

const { InstallationIosLazy } = lazyfy(
  () => import('./InstallationIos/InstallationIos'),
  'InstallationIos',
);

export const InstallationProvider = observer(function InstallationProvider() {
  const { implementationKind, canBeInstalled } = useStore('installation');
  const isRenderIosProvider = implementationKind === 'iOS' && canBeInstalled;

  if (!isRenderIosProvider) {
    return null;
  }

  return <InstallationIosLazy />;
});
