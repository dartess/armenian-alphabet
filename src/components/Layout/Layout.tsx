import { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import QuizIcon from '@mui/icons-material/Quiz';
import SettingsIcon from '@mui/icons-material/Settings';
import { Paper } from '@mui/material';

import { Router } from '@/components/Router/Router';
import type { PageValue } from '@/types/model';

import styles from './Layout.module.css';
import { IconAyb } from './view/IconAyb';

export function Layout() {
  const [page, setPage] = useState<PageValue>('alphabet');

  return (
    <div className={styles.root}>
      <main className={styles.main}>
        <Router page={page} />
      </main>
      <div className={styles.footer}>
        <Paper elevation={3}>
          <BottomNavigation
            value={page}
            onChange={(event, newValue) => {
              setPage(newValue);
            }}
            showLabels
          >
            <BottomNavigationAction label="Алфавит" icon={<IconAyb />} value="alphabet" />
            <BottomNavigationAction label="Практика" icon={<QuizIcon />} value="practice" />
            <BottomNavigationAction label="Настройки" icon={<SettingsIcon />} value="settings" />
          </BottomNavigation>
        </Paper>
      </div>
    </div>
  );
}
