import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useToggle } from 'react-use';
import Link from '@mui/material/Link';

import { LinkExternal } from '@/components/LinkExternal';

export function AboutLicense() {
  const [isOpen, toggleIsOpen] = useToggle(false);

  return (
    <Box sx={{ my: 1 }}>
      <Link
        component="button"
        variant="overline"
        onClick={toggleIsOpen}
        color="secondary"
      >
        Лицензии
      </Link>
      <Dialog open={isOpen} onClose={toggleIsOpen}>
        <DialogTitle>
          Использованные материалы
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 1 }}>
            Озвучка использована по лицензии CC BY 3.0. Автор:
            {' '}
            <LinkExternal href="https://commons.wikimedia.org/wiki/User:Vahagn_Petrosyan">
              Vahagn Petrosyan
            </LinkExternal>
          </DialogContentText>
          <DialogContentText>
            Изображения сгенерированы в
            {' '}
            <LinkExternal href="https://dream.ai/">
              Dream by WOMBO
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
