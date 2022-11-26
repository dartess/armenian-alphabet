import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Link from '@mui/material/Link';
import DialogActions from '@mui/material/DialogActions';
import { useToggle } from 'react-use';

import { reachGoal } from '@/utils/reachGoal';

export function AboutContacts() {
  const [isOpen, toggleIsOpen] = useToggle(false);

  useEffect(
    () => {
      if (isOpen) {
        reachGoal('openContacts');
      }
    },
    [isOpen],
  );

  return (
    <Box sx={{ my: 1 }}>
      <Button variant="outlined" onClick={toggleIsOpen}>
        Контакты
      </Button>
      <Dialog open={isOpen} onClose={toggleIsOpen}>
        <DialogTitle>
          Контакты
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ my: 1 }}>
            Если у вас есть обратная связь по приложению,
            вы можете написать мне на почту
            {' '}
            <Link href="mailto:aybuben.app@mail.ru?subject=Aybuben%20app">
              aybuben.app@mail.ru
            </Link>
            .
          </DialogContentText>
          <DialogContentText>
            Также вы можете мне написать, если вы являетесь
            дизайнером и хотите поучаствовать в развитии приложения.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleIsOpen}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
