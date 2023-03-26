import React from 'react';
import cn from 'classnames';

import type { Props } from '../model';

import { ReactComponent as CrossIcon } from './Cross.svg';
import styles from './BottomSheetChrome.module.css';

export function BottomSheetChrome({ isOpen, onClose, children, closePosition }: Props) {
  return (
    <aside className={cn(styles.root, { [styles.show]: isOpen })}>
      <div className={styles.content}>
        {children}
        <button
          type="button"
          className={cn(styles.close, { [styles.closeCentered]: closePosition === 'center' })}
          onClick={onClose}
        >
          <CrossIcon />
        </button>
      </div>
    </aside>
  );
}
