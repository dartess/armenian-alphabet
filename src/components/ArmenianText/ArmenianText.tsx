import styles from './ArmenianText.module.css';

interface Props {
  children: string;
}

export function ArmenianText({ children }: Props) {
  return <span className={styles.root}>{children}</span>;
}
