import type { ReactNode } from 'react';

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  closePosition?: 'center' | 'top';
}
