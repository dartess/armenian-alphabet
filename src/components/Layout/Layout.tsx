import { useLocation } from "wouter";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import QuizIcon from '@mui/icons-material/Quiz';

import styles from './Layout.module.css'
import { IconAyb } from "./view/IconAyb";
import { Router } from "@/components/Router/Router";
import { Paper } from "@mui/material";

export const Layout = () => {
  const [location, setLocation] = useLocation();

  return <div className={styles.root}>
    <main className={styles.main}>
      <Router />
    </main>
    <div className={styles.footer}>
      <Paper elevation={3}>
        <BottomNavigation
          value={location}
          onChange={(event, newValue) => {
            setLocation(newValue);
          }}
        >
          <BottomNavigationAction label="Алфавит" icon={<IconAyb/>} value='/alphabet'/>
          <BottomNavigationAction label="Практика" icon={<QuizIcon/>} value='/practice'/>
        </BottomNavigation>
      </Paper>
    </div>
  </div>
}
