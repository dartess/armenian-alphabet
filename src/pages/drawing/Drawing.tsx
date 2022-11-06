import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useStore } from '@/core/stores';

import { DrawingTask } from './DrawingTask';

export function Drawing() {
  const { hasProgress } = useStore('progress');

  if (!hasProgress) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '15px',
        }}
      >
        <Typography variant="h6" align="center">
          Вы ещё не начали изучать алфавит. Приходите позже.
        </Typography>
      </Box>
    );
  }

  return <DrawingTask />;
}
