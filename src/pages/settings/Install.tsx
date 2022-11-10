import Button from '@mui/material/Button';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import { observer } from 'mobx-react-lite';

import { useStore } from '@/core/stores';
import { IS_OS_MOBILE } from '@/utils/envPlatform';

const InstallIcon = IS_OS_MOBILE ? InstallMobileIcon : InstallDesktopIcon;

export const Install = observer(function Install() {
  const { showInstallPrompt } = useStore('installation');

  return (
    <Button
      color="warning"
      variant="outlined"
      onClick={showInstallPrompt}
      endIcon={<InstallIcon />}
    >
      Установить приложение
    </Button>
  );
});
