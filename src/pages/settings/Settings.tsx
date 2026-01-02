import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { observer } from 'mobx-react-lite';

import { useStore } from '@/core/stores';

import { ResetButton } from './ResetButton';
import { ChangeTheme } from './ChangeTheme';
import { Install } from './Install';
import { AboutDonate } from './AboutDonate';
import { AboutContacts } from './AboutContacts';
import { AboutLicense } from './AboutLicense';

export const Settings = observer(function Settings() {
  const { canBeInstalled } = useStore('installation');
  const { isProgressCompleted, progressCounts } = useStore('progress');
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        alignItems: 'flex-start',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '24px',
        gap: '1rem',
      }}
    >
      <h1>Настройки</h1>
      <FormControl>
        <FormLabel id="theme">Тема приложения</FormLabel>
        <ChangeTheme />
      </FormControl>
      {canBeInstalled && (
        <FormControl>
          <Install />
        </FormControl>
      )}
      <FormControl>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <FormLabel>
            Прогресс:{' '}
            {isProgressCompleted
              ? 'завершён'
              : `${progressCounts.newCount} / ${progressCounts.progressCount} / ${progressCounts.doneCount}`}
          </FormLabel>
          <ResetButton />
        </div>
      </FormControl>
      <FormControl>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <FormLabel>О приложении</FormLabel>
          <AboutDonate />
          <AboutContacts />
        </div>
      </FormControl>
      <div style={{ alignSelf: 'flex-end' }}>
        <AboutLicense />
      </div>
    </div>
  );
});
