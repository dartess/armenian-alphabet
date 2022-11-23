import type { ReactNode } from 'react';

import styles from './ArmenianText.module.css';

interface Props {
  children: string | ReactNode;
}

export function ArmenianText({ children }: Props) {
  return <span className={styles.root}>{children}</span>;
}
