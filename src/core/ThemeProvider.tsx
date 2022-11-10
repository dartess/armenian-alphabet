import { useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { observer } from 'mobx-react-lite';
import type { PaletteMode } from '@mui/material';
import type { ReactNode } from 'react';

import { useStore } from '@/core/stores';

interface Props {
  children: ReactNode;
}

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        primary: {
          main: '#ff8f00',
          light: '#ffc046',
          dark: '#c56000',
          contrastText: '#000000',
        },
        secondary: {
          light: '#f8fdff',
          main: '#c5cae9',
          dark: '#9499b7',
          contrastText: '#000000',
        },
      }
      : {
        primary: {
          main: '#ff8f00',
          light: '#ffc046',
          dark: '#c56000',
          contrastText: '#000000',
        },
        secondary: {
          light: '#f8fdff',
          main: '#c5cae9',
          dark: '#9499b7',
          contrastText: '#000000',
        },
      }),
  },
});

export const ThemeProvider = observer(function ThemeProvider({ children }: Props) {
  const { appTheme } = useStore('settings');
  const theme = useMemo(() => createTheme(getDesignTokens(appTheme)), [appTheme]);
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
});
