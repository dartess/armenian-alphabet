import { lazyfy } from '@/utils/lazyfy';

const { CongratulationsLazy } = lazyfy(() => import('./Congratulations'), 'Congratulations');

export { CongratulationsLazy };
