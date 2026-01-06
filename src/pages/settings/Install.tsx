import { MdInstallMobile, MdInstallDesktop } from 'react-icons/md';
import { observer } from 'mobx-react-lite';

import { Button } from '@/components/Button/Button';
import { useStore } from '@/core/stores';
import { IS_OS_MOBILE } from '@/utils/envPlatform';
import { reachGoal } from '@/utils/reachGoal';

const InstallIcon = IS_OS_MOBILE ? MdInstallMobile : MdInstallDesktop;

export const Install = observer(function Install() {
  const { showInstallPrompt } = useStore('installation');

  const handleInstall = () => {
    showInstallPrompt();
    reachGoal('installationStart');
  };

  return (
    <Button variant="secondary" onClick={handleInstall} endIcon={<InstallIcon />}>
      Установить приложение
    </Button>
  );
});
