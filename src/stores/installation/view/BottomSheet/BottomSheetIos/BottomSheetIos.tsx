import React from 'react';
import cn from 'classnames';

import type { Props } from '../model';

import styles from './BottomSheetIos.module.css';

export function BottomSheetIos({ isOpen, onClose, children, closePosition }: Props) {
  return (
    <aside className={cn(styles.root, { [styles.show]: isOpen })}>
      {children}
      <button
        type="button"
        className={cn(styles.close, { [styles.closeCentered]: closePosition === 'center' })}
        onClick={onClose}
      >
        <svg viewBox="0 0 24 24">
          {/* eslint-disable-next-line max-len */}
          <path d="M5.3 18.7c.2.2.4.3.7.3s.5-.1.7-.3l5.3-5.3 5.3 5.3a1.08 1.08 0 0 0 .7.3 1.08 1.08 0 0 0 .7-.3c.4-.4.4-1 0-1.4L13.4 12l5.3-5.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0L12 10.6 6.7 5.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l5.3 5.3-5.3 5.3c-.4.4-.4 1 0 1.4z" />
        </svg>
      </button>
    </aside>
  );
}
