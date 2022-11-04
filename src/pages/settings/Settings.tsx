import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { ResetButton } from './ResetButton';

export function Settings() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Box sx={{ my: 3, mx: 2 }}>
        <Typography gutterBottom variant="h4" component="div">
          Настройки
        </Typography>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          subheader={<ListSubheader>Очистка данных</ListSubheader>}
        >
          <ListItem>
            <ListItemIcon>
              <DeleteForeverIcon />
            </ListItemIcon>
            <ResetButton />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
