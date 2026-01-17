import { Dialog as BaseUiDialog } from '@base-ui/react/dialog';
import type { ReactNode } from 'react';

import styles from './Dialog.module.css';

type Props = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
};

export const Dialog = ({ open, onOpenChange, title, children, actions }: Props) => {
  return (
    <BaseUiDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseUiDialog.Portal>
        <BaseUiDialog.Backdrop className={styles.backdrop} />
        <BaseUiDialog.Popup className={styles.popup}>
          {title && <BaseUiDialog.Title className={styles.title}>{title}</BaseUiDialog.Title>}
          <div className={styles.description}>{children}</div>
          {Boolean(actions) && <div className={styles.actions}>{actions}</div>}
        </BaseUiDialog.Popup>
      </BaseUiDialog.Portal>
    </BaseUiDialog.Root>
  );
};
