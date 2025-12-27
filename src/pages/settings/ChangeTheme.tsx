import { observer } from 'mobx-react-lite';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import type { ChangeEvent } from 'react';

import { useStore } from '@/core/stores';
import type { UserTheme } from '@/types/model';

export const ChangeTheme = observer(function ChangeTheme() {
  const { userTheme, setUserTheme } = useStore('settings');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserTheme((event.target as HTMLInputElement).value as UserTheme);
  };

  return (
    <RadioGroup aria-labelledby="theme" value={userTheme} onChange={handleChange}>
      <FormControlLabel value="system" control={<Radio />} label="Системная" />
      <FormControlLabel value="light" control={<Radio />} label="Светлая" />
      <FormControlLabel value="dark" control={<Radio />} label="Тёмная" />
    </RadioGroup>
  );
});
