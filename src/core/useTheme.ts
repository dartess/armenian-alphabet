import { useEffect } from 'react';

import { useStore } from '@/core/stores';

function makeThemeColorMeta(): HTMLMetaElement {
  const meta = document.createElement('meta');
  meta.name = 'theme-color';
  document.head.appendChild(meta);
  return meta;
}

function getThemeColorMeta(): HTMLMetaElement {
  return document.querySelector('meta[name="theme-color"]') ?? makeThemeColorMeta();
}

export function useTheme() {
  const { appTheme } = useStore('settings');

  useEffect(
    function toggleTheme() {
      const themeColorMeta = getThemeColorMeta();
      themeColorMeta.content = appTheme === 'light' ? '#ff8f00' : '#ffb74d';
      window.document.documentElement.dataset.theme = appTheme;
    },
    [appTheme],
  );
}
