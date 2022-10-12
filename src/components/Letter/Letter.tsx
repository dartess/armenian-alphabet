import { LetterState, LetterType } from "../../model";
import styles from './Letter.module.css';
import cn from 'classnames';

type Props = LetterType & {
  state?: LetterState;
};

export function Letter({ uppercase, lowercase, transliteration, state }: Props) {
  return <div className={cn(styles.root, { [styles.progress]: state === 'progress', [styles.done]: state === 'done' })}>
    <div>{uppercase} {lowercase}</div>
    <div className={styles.transliteration}>{transliteration}</div>
  </div>
}
