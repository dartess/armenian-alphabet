import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import QuizIcon from '@mui/icons-material/Quiz';
import SettingsIcon from '@mui/icons-material/Settings';
import GestureIcon from '@mui/icons-material/Gesture';
import { Paper } from '@mui/material';
import { useLocation } from 'wouter';

import { Router } from '../Router';

import { IconAyb } from './view/IconAyb';
import styles from './Layout.module.css';

export function Layout() {
  const [location, setLocation] = useLocation();

  const page = location.slice(1);

  return (
    <div className={styles.root}>
      <main className={styles.main}>
        <Router />
      </main>
      <div className={styles.footer}>
        <Paper className={styles.footerPaper} elevation={3}>
          <BottomNavigation
            value={page}
            onChange={(_, newValue) => {
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- TODO
              setLocation(`/${newValue}`)
            }}
            showLabels
          >
            <BottomNavigationAction label="Алфавит" icon={<IconAyb />} value="alphabet" />
            <BottomNavigationAction label="Квиз" icon={<QuizIcon />} value="quiz" />
            <BottomNavigationAction label="Рисовач" icon={<GestureIcon />} value="drawing" />
            <BottomNavigationAction label="Настройки" icon={<SettingsIcon />} value="settings" />
          </BottomNavigation>
        </Paper>
      </div>
    </div>
  );
}
