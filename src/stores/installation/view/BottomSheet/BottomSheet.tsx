import { observer } from 'mobx-react-lite';

import { useStore } from '@/core/stores';

import type { Props } from './model';
import { BottomSheetIos } from './BottomSheetIos/BottomSheetIos';
import { BottomSheetChrome } from './BottomSheetChrome/BottomSheetChrome';

export const BottomSheet = observer(function BottomSheet(props: Props) {
  const { implementationKind } = useStore('installation');

  switch (implementationKind) {
    case 'iOS':
      return <BottomSheetIos {...props} />;

    case 'native':
      return <BottomSheetChrome {...props} />;

    default:
      return null;
  }
});
