import Button from '@mui/material/Button';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import { observer } from 'mobx-react-lite';

import { useStore } from '@/core/stores';
import { IS_OS_MOBILE } from '@/utils/envPlatform';
import { reachGoal } from '@/utils/reachGoal';

const InstallIcon = IS_OS_MOBILE ? InstallMobileIcon : InstallDesktopIcon;

export const Install = observer(function Install() {
  const { showInstallPrompt } = useStore('installation');

  const handleInstall = () => {
    showInstallPrompt();
    reachGoal('installationStart');
  };

  return (
    <Button
      variant="outlined"
      onClick={handleInstall}
      endIcon={<InstallIcon />}
    >
      Установить приложение
    </Button>
  );
});
