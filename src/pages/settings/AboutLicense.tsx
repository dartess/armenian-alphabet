import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useToggle } from 'react-use';

import { LinkExternal } from '@/components/LinkExternal';

export function AboutLicense() {
  const [isOpen, toggleIsOpen] = useToggle(false);

  return (
    <Box sx={{ my: 1 }}>
      <Button variant="outlined" onClick={toggleIsOpen}>
        Лицензии
      </Button>
      <Dialog open={isOpen} onClose={toggleIsOpen}>
        <DialogTitle>
          Использованные материалы
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Озвучка использована по лицензии CC BY 3.0.
          </DialogContentText>
          <DialogContentText>
            Автор:
            {' '}
            <LinkExternal
              href="https://commons.wikimedia.org/wiki/User:Vahagn_Petrosyan"
            >
              Vahagn Petrosyan
            </LinkExternal>
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
