import type { ReactNode } from 'react';

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  closePosition?: 'center' | 'top';
};
