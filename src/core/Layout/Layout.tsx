import { observer } from 'mobx-react-lite';
import { MdQuiz, MdSettings, MdGesture } from 'react-icons/md';
import { useLocation } from 'wouter';

import { BottomNavigation } from '@/components/BottomNavigation/BottomNavigation';

import { useTheme } from '../useTheme';
import { Router } from '../Router';

import { IconAyb } from './view/IconAyb';
import styles from './Layout.module.css';

export const Layout = observer(function Layout() {
  const [location, setLocation] = useLocation();

  const page = location.slice(1);

  useTheme();

  return (
    <div className={styles.root}>
      <main className={styles.main}>
        <Router />
      </main>
      <div className={styles.footer}>
        <BottomNavigation
          value={page}
          onChange={(newValue) => {
            setLocation(`/${newValue}`);
          }}
          items={[
            {
              value: 'alphabet',
              label: 'Алфавит',
              icon: <IconAyb />,
            },
            {
              value: 'quiz',
              label: 'Квиз',
              icon: <MdQuiz />,
            },
            {
              value: 'drawing',
              label: 'Рисовач',
              icon: <MdGesture />,
            },
            {
              value: 'settings',
              label: 'Настройки',
              icon: <MdSettings />,
            },
          ]}
        />
      </div>
    </div>
  );
});
