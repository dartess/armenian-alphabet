/* eslint-disable react/jsx-props-no-spreading -- by design */
import { useStore } from '@/core/stores';

import type { Props } from './model';
import { BottomSheetIos } from './BottomSheetIos/BottomSheetIos';
import { BottomSheetChrome } from './BottomSheetChrome/BottomSheetChrome';

export function BottomSheet(props: Props) {
  const { implementationKind } = useStore('installation');

  switch (implementationKind) {
    case 'iOS':
      return <BottomSheetIos {...props} />;
    case 'native':
      return <BottomSheetChrome {...props} />;
    default:
      return null;
  }
}
