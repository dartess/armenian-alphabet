import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { observer } from 'mobx-react-lite';

import { useStore } from '@/core/stores';

import { ResetButton } from './ResetButton';
import { ChangeTheme } from './ChangeTheme';
import { Install } from './Install';

export const Settings = observer(function Settings() {
  const { canBeInstalled } = useStore('installation');
  const { isProgressCompleted, progressCounts } = useStore('progress');
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Box sx={{ my: 3, mx: 2 }}>
        <Typography gutterBottom variant="h4" component="div">
          Настройки
        </Typography>
      </Box>
      <Box sx={{ my: 3, mx: 2 }}>
        <FormControl>
          <FormLabel id="theme">Тема приложения</FormLabel>
          <ChangeTheme />
        </FormControl>
      </Box>
      {canBeInstalled && (
        <Box sx={{ my: 3, mx: 2 }}>
          <FormControl>
            <Install />
          </FormControl>
        </Box>
      )}
      <Box sx={{ my: 3, mx: 2 }}>
        <FormControl>
          <FormLabel sx={{ mb: 1 }}>
            Прогресс:
            {' '}
            {isProgressCompleted
              ? 'завершён'
              : `${progressCounts.newCount} / ${progressCounts.progressCount} / ${progressCounts.doneCount}`}
          </FormLabel>
          <ResetButton />
        </FormControl>
      </Box>
    </Box>
  );
});
