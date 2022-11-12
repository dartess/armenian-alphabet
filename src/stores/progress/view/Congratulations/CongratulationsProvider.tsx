import { observer } from 'mobx-react-lite';

import { useStore } from '@/core/stores';

import { CongratulationsLazy } from './CongratulationsLazy';

export const CongratulationsProvider = observer(function CongratulationsProvider() {
  const { isShowCongratulations } = useStore('progress');
  if (isShowCongratulations) {
    return <CongratulationsLazy />;
  }
  return null;
});
