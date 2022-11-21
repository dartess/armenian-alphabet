import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { useCopyToClipboard, useToggle } from 'react-use';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import type { SyntheticEvent } from 'react';
import { useState } from 'react';

const cryptoItems = [
  {
    name: 'Litecoin',
    value: 'LXBsTiA2LaoR1JogRFXEcw6Pn1ruNMKrzq',
  },
  {
    name: 'USDT (TRC20)',
    value: 'TAfWnTToyiFCwKYshNWEVu8pSa5zESS9Ji',
  },
];

export function AboutDonate() {
  const [isOpen, toggleIsOpen] = useToggle(false);
  const [, copyToClipboard] = useCopyToClipboard();
  const [snackbarItem, setSnackbarItem] = useState<null | string>(null);

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarItem(null);
  };

  return (
    <Box sx={{ my: 1 }}>
      <Button variant="outlined" onClick={toggleIsOpen}>
        «Спасибо»
      </Button>
      <Dialog open={isOpen} onClose={toggleIsOpen}>
        <DialogTitle>
          Сказать «Спасибо»
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ my: 1 }}>
            Если это приложение вам помогло, я очень этому рад!
          </DialogContentText>
          <DialogContentText sx={{ my: 1 }}>
            При желании вы можете отблагодарить автора шоколадкой 🍫 или помочь оплатить домен 🌐.
          </DialogContentText>
          <DialogContentText sx={{ my: 1 }}>
            Сделать это можно любым удобным для вас способом:
          </DialogContentText>
          <Box sx={{ my: 1 }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href="https://boosty.to/aybuben"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ListItemIcon>
                    <OpenInNewIcon />
                  </ListItemIcon>
                  <ListItemText primary={<Link component="button">Boosty</Link>} />
                </ListItemButton>
              </ListItem>
              {cryptoItems.map((crypto) => (
                <ListItem disablePadding key={crypto.value}>
                  <ListItemButton onClick={() => {
                    copyToClipboard(crypto.value);
                    setSnackbarItem(crypto.name);
                  }}
                  >
                    <ListItemIcon>
                      <ContentCopyIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${crypto.name}: ${crypto.value}`}
                      primaryTypographyProps={{
                        style: {
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleIsOpen}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={!!snackbarItem}
        autoHideDuration={4000}
        onClose={handleClose}
        message={snackbarItem && `Скопирован адрес ${snackbarItem}`}
      />
    </Box>
  );
}
