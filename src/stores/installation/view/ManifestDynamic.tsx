import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '@/core/stores';

export const ManifestDynamic = observer(function ManifestDynamic() {
  const { manifestUrl } = useStore('installation');

  useEffect(() => {
    if (!manifestUrl) {
      return;
    }
    const linkManifest = document.querySelector<HTMLLinkElement>('[rel="manifest"]');
    if (!linkManifest) {
      return;
    }
    linkManifest.href = manifestUrl;
  }, [manifestUrl]);

  return null;
});
