import { useState } from "react";

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import QuizIcon from '@mui/icons-material/Quiz';

import styles from './Layout.module.css'
import { IconAyb } from "./view/IconAyb";
import { PageValue } from "@/types/model";
import { Router } from "@/components/Router/Router";

export const Layout = () => {
  const [page, setPage] = useState<PageValue>('alphabet');

  return <div className={styles.root}>
    <main className={styles.main}>
      <Router page={page} />
    </main>
    <div className={styles.footer}>
      <BottomNavigation
        value={page}
        onChange={(event, newValue) => {
          setPage(newValue);
        }}
      >
        <BottomNavigationAction label="Алфавит" icon={<IconAyb />} value='alphabet' />
        <BottomNavigationAction label="Практика" icon={<QuizIcon />} value='practice' />
      </BottomNavigation>
    </div>
  </div>
}
