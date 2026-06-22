import cn from 'classnames';

import type { LetterState, LetterType } from '@/types/model';
import { LetterUppercase } from '@/components/units/LetterUppercase';
import { LetterLowercase } from '@/components/units/LetterLowercase';
import { LetterTransliteration } from '@/components/units/LetterTransliteration';
import { LetterIpa } from '@/components/units/LetterIpa';
import { LetterAudio } from '@/components/LetterAudio/LetterAudio';

import styles from './Letter.module.css';

type Props = {
  letter: LetterType;
  state?: LetterState;
  showVariants: boolean;
};

export function Letter({ letter, state = 'new', showVariants }: Props) {
  return (
    <div className={cn(styles.root, styles[state])}>
      <div>
        <LetterUppercase letter={letter} showVariants={showVariants} />{' '}
        <LetterLowercase letter={letter} />
      </div>
      <div className={styles.info}>
        <LetterTransliteration letter={letter} showVariants={showVariants} />
        <hr className={styles.divider} />
        <LetterIpa letter={letter} showVariants={showVariants} />
        {showVariants && (
          <>
            <hr className={styles.divider} />
            <LetterAudio letter={letter} />
          </>
        )}
      </div>
    </div>
  );
}
