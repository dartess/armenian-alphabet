import { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useToggle } from 'react-use';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from '@mui/material/Link';

import { Button } from '@/components/Button/Button';
import { Dialog } from '@/components/Dialog/Dialog';
import { reachGoal } from '@/utils/reachGoal';

export function AboutDonate() {
  const [isOpen, toggleIsOpen] = useToggle(false);

  useEffect(() => {
    if (isOpen) {
      reachGoal('openDonate');
    }
  }, [isOpen]);

  return (
    <Box sx={{ my: 1 }}>
      <Button variant="secondary" onClick={toggleIsOpen}>
        «Спасибо»
      </Button>
      <Dialog
        open={isOpen}
        onOpenChange={toggleIsOpen}
        title="Сказать «Спасибо»"
        actions={<Button onClick={toggleIsOpen}>Закрыть</Button>}
      >
        <Box sx={{ my: 1 }}>Если это приложение вам помогло, я очень этому рад!</Box>
        <Box sx={{ my: 1 }}>
          При желании вы можете отблагодарить автора шоколадкой 🍫 или помочь оплатить домен 🌐.
        </Box>
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
          </List>
        </Box>
      </Dialog>
    </Box>
  );
}
