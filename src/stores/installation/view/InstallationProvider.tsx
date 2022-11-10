import { useStore } from '@/core/stores';
import { lazyfy } from '@/utils/lazyfy';

const { InstallationIosLazy } = lazyfy(
  () => import(/* webpackChunkName: "InstallationIos" */ './InstallationIos/InstallationIos'),
  'InstallationIos',
);

export function InstallationProvider() {
  const { implementationKind, canBeInstalled } = useStore('installation');
  const isRenderIosProvider = implementationKind === 'iOS' && canBeInstalled;

  if (!isRenderIosProvider) {
    return null;
  }

  return <InstallationIosLazy />;
}
