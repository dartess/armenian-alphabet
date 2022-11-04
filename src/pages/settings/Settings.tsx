import { useState } from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import WifiIcon from '@mui/icons-material/Wifi';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const Settings = () => {
  const [state, setState] = useState({
    gilad: true,
    jason: false,
    antoine: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Box sx={{ my: 3, mx: 2 }}>
        <Typography gutterBottom variant="h4" component="div">
          Настройки
        </Typography>
        {/*<FormControl component="fieldset" variant="standard">*/}
        {/*  <FormLabel component="legend">Отображение</FormLabel>*/}
        {/*  <FormGroup>*/}
        {/*    <FormControlLabel*/}
        {/*      control={*/}
        {/*        <Switch checked={state.gilad} onChange={handleChange} name="gilad"/>*/}
        {/*      }*/}
        {/*      label="Произношение (МФА)"*/}
        {/*      // TODO: тултип?*/}
        {/*    />*/}
        {/*    <FormControlLabel*/}
        {/*      control={*/}
        {/*        <Switch checked={state.jason} onChange={handleChange} name="jason"/>*/}
        {/*      }*/}
        {/*      label="Jason Killian"*/}
        {/*    />*/}
        {/*    <FormControlLabel*/}
        {/*      control={*/}
        {/*        <Switch checked={state.antoine} onChange={handleChange} name="antoine"/>*/}
        {/*      }*/}
        {/*      label="Antoine Llorca"*/}
        {/*    />*/}
        {/*  </FormGroup>*/}
        {/*</FormControl>*/}

        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          subheader={<ListSubheader>Очистка данных</ListSubheader>}
        >
          <ListItem>
            <ListItemIcon>
              <DeleteForeverIcon />
            </ListItemIcon>
            <Button color='warning' variant='outlined'>Стереть данные</Button>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

