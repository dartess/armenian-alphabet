import type { ReactNode } from 'react';
import cn from 'classnames';

import styles from './BottomNavigation.module.css';

type NavigationItem<T extends string> = {
  value: T;
  label: string;
  icon: ReactNode;
};

type Props<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  items: Array<NavigationItem<T>>;
};

export const BottomNavigation = <T extends string>({ value, onChange, items }: Props<T>) => {
  return (
    <div className={styles.root}>
      {items.map((item) => {
        return (
          <button
            key={item.value}
            type="button"
            className={cn(styles.item, item.value === value && styles.active)}
            onClick={() => {
              onChange(item.value);
            }}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
