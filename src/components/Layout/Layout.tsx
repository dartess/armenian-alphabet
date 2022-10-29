import { useState } from "react";

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Alphabet } from "@/pages/alphabet/Alphabet/Alphabet";
import styles from './Layout.module.css'

type PageValue = 'alphabet' | 'practice';

export const Layout = () => {
  const [page, setPage] = useState<PageValue>('alphabet');

  return <div className={styles.root}>
    <main className={styles.main}>
      <Alphabet />
    </main>
    <div className={styles.footer}>
      <BottomNavigation
        value={page}
        onChange={(event, newValue) => {
          setPage(newValue);
        }}
      >
        <BottomNavigationAction label="Алфавит" icon={<RestoreIcon />} value='alphabet' />
        <BottomNavigationAction label="Практика" icon={<FavoriteIcon />} value='practice' />
      </BottomNavigation>
    </div>
  </div>
}
