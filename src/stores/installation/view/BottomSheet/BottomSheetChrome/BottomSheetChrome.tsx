import React from 'react';
import cn from 'classnames';

import type { Props } from '../model';

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
          <svg viewBox="0 0 512 512">
            {/* eslint-disable-next-line max-len */}
            <path d="M512 59.08 452.92 0 256 196.92 59.08 0 0 59.08 196.92 256 0 452.92 59.08 512 256 315.08 452.92 512 512 452.92 315.08 256z" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
