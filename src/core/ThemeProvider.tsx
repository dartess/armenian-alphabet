import { useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { observer } from 'mobx-react-lite';
import type { PaletteMode } from '@mui/material';
import type { ReactNode } from 'react';

import { useStore } from '@/core/stores';

type Props = {
  children: ReactNode;
};

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
            main: '#c5cae9',
            light: '#f8fdff',
            dark: '#9499b7',
            contrastText: '#000000',
          },
        }
      : {
          primary: {
            main: '#ffb74d',
            light: '#ffe97d',
            dark: '#c88719',
            contrastText: '#000000',
          },
          secondary: {
            main: '#b0bec5',
            light: '#e2f1f8',
            dark: '#808e95',
            contrastText: '#000000',
          },
        }),
  },
});

function makeThemeColorMeta(): HTMLMetaElement {
  const meta = document.createElement('meta');
  meta.name = 'theme-color';
  document.head.appendChild(meta);
  return meta;
}

function getThemeColorMeta(): HTMLMetaElement {
  return document.querySelector('meta[name="theme-color"]') ?? makeThemeColorMeta();
}

export const ThemeProvider = observer(function ThemeProvider({ children }: Props) {
  const { appTheme } = useStore('settings');

  const theme = useMemo(() => createTheme(getDesignTokens(appTheme)), [appTheme]);

  useEffect(
    function toggleTheme() {
      const themeColorMeta = getThemeColorMeta();
      themeColorMeta.content = theme.palette.primary.main;
    },
    [theme],
  );

  useEffect(
    function updateTheme() {
      window.document.documentElement.dataset.theme = appTheme;
    },
    [appTheme],
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
});
