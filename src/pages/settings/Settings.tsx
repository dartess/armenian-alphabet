import { observer } from 'mobx-react-lite';
import cn from 'classnames'; // TODO linter - last section

import { useStore } from '@/core/stores';

import { ResetButton } from './ResetButton';
import { ChangeTheme } from './ChangeTheme';
import { Install } from './Install';
import { AboutDonate } from './AboutDonate';
import { AboutContacts } from './AboutContacts';
import { AboutLicense } from './AboutLicense';
import styles from './Settings.module.css';

export const Settings = observer(function Settings() {
  const { canBeInstalled } = useStore('installation');
  const { isProgressCompleted, progressCounts } = useStore('progress');
  return (
    <div className={styles.root}>
      <h1>Настройки</h1>
      <div className={styles.section}>
        <h2 className={styles.subtitle}>Тема приложения</h2>
        <ChangeTheme />
      </div>
      {canBeInstalled && (
        <div className={styles.section}>
          <Install />
        </div>
      )}
      <div className={styles.section}>
        <h2 className={styles.subtitle}>
          Прогресс:{' '}
          {isProgressCompleted
            ? 'завершён'
            : `${progressCounts.newCount} / ${progressCounts.progressCount} / ${progressCounts.doneCount}`}
        </h2>
        <ResetButton />
      </div>
      <div className={styles.section}>
        <h2 className={styles.subtitle}>О приложении</h2>
        <AboutDonate />
        <AboutContacts />
      </div>
      <div className={cn(styles.section, styles.end)}>
        <AboutLicense />
      </div>
    </div>
  );
});
