import cn from 'classnames';

import { wordExamples } from '@/constants/wordExamples';
import type { LetterType } from '@/types/model';
import { ArmenianText } from '@/components/ArmenianText/ArmenianText';
import { HighlightedText } from '@/components/HighlightedText/HighlightedText';

import styles from './Illustration.module.css';

type Props = {
  letter: LetterType;
};

export function Illustration({ letter }: Props) {
  const [word, wordTransliteration, wordTranslation, imageName] = wordExamples[letter.lowercase];

  const imagePath = `/pictures/words/${imageName}.jpg`;

  return (
    <div className={styles.root}>
      <div className={styles.imageWrapper}>
        <img src={imagePath} alt={wordTransliteration} className={styles.image} />
      </div>
      <div className={styles.description}>
        <div className={cn(styles.side, styles.left)}>
          <ArmenianText>
            <span className={styles.wordLine}>
              <HighlightedText text={word} highlights={letter.lowercase} textCase="uppercase" />
            </span>
          </ArmenianText>
          <ArmenianText>
            <span className={styles.wordLineMuted}>
              <HighlightedText text={word} highlights={letter.lowercase} textCase="lowercase" />
            </span>
          </ArmenianText>
          <span className={styles.transliteration}>
            <HighlightedText text={wordTransliteration} highlights={letter.transliteration} />
          </span>
        </div>
        <div className={styles.side}>
          <span className={styles.translation}>{wordTranslation}</span>
        </div>
      </div>
    </div>
  );
}
