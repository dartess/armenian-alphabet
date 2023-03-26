import { observer } from 'mobx-react-lite';

import { useStore } from '@/core/stores';
import { DrawingEmpty } from '@/pages/drawing/DrawingEmpty';

import { DrawingTask } from './DrawingTask';

export const Drawing = observer(function Drawing() {
  const { hasProgress } = useStore('progress');

  return hasProgress ? <DrawingTask /> : <DrawingEmpty />;
});
