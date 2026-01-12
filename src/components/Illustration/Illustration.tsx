import cn from 'classnames';

import { wordExamples } from '@/constants/wordExamples';
import type { LetterType } from '@/types/model';
import { ArmenianText } from '@/components/ArmenianText/ArmenianText';
import { HighlightedText } from '@/components/HighlightedText/HighlightedText';

import styles from './Illustration.module.css';

type Props = {
  letter: LetterType; // todo force ;
};

export function Illustration({ letter }: Props) {
  const [word, wordTransliteration, wordTranslation, imageName] = wordExamples[letter.lowercase];

  const imagePath = `/pictures/words/${imageName}.jpg`;

  return (
    <div>
      <div className={styles.imageWrapper}>
        <img src={imagePath} alt={wordTransliteration} className={styles.image} />
      </div>
      <div className={styles.description}>
        <div className={cn(styles.side, styles.left)}>
          <ArmenianText>
            <HighlightedText text={word} highlights={letter.lowercase} textCase="uppercase" />
          </ArmenianText>
          <ArmenianText>
            <HighlightedText text={word} highlights={letter.lowercase} textCase="lowercase" />
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
