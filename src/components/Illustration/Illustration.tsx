import { ImageListItem, ImageListItemBar, Paper } from '@mui/material';

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
      <ImageListItem>
        <Paper className={styles.imageWrapper} elevation={2}>
          <img src={imagePath} alt={wordTransliteration} className={styles.image} />
        </Paper>
        <ImageListItemBar
          title={
            <>
              <div>
                <ArmenianText>
                  <HighlightedText text={word} highlights={letter.lowercase} textCase="uppercase" />
                </ArmenianText>
              </div>
              <div>
                <ArmenianText>
                  <HighlightedText text={word} highlights={letter.lowercase} textCase="lowercase" />
                </ArmenianText>
              </div>
            </>
          }
          subtitle={
            <div style={{ marginTop: '0.5rem' }}>
              <div style={{ marginBottom: '0.2rem' }}>
                <HighlightedText text={wordTransliteration} highlights={letter.transliteration} />
              </div>
              <div>{wordTranslation}</div>
            </div>
          }
          position="below"
        />
      </ImageListItem>
    </div>
  );
}
