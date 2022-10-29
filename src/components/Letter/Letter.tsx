import { LetterState, LetterType } from "../../model";
import styles from './Letter.module.css';
import cn from 'classnames';
import { Fragment } from "react";

type Props = LetterType & {
  state?: LetterState;
};

export function Letter({ uppercase, lowercase, transliteration, ipa, state }: Props) {
  return <div className={cn(styles.root, { [styles.progress]: state === 'progress', [styles.done]: state === 'done' })}>
    <div>{uppercase} {lowercase}</div>
    <div className={styles.info}>
      {transliteration}{' '}
      {Array.isArray(ipa) ? ipa.map(ipaItem => <Fragment key={ipaItem}>
        [{ipaItem}]
      </Fragment>) : <>[{ ipa }]</>}
    </div>
  </div>
}
