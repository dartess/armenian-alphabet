import { ImageListItem, ImageListItemBar, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';

import { wordExamples } from '@/constants/wordExamples';
import type { LetterType } from '@/types/model';
import { ArmenianText } from '@/components/ArmenianText/ArmenianText';
import { HighlightedText } from '@/components/HighlightedText/HighlightedText';

import styles from './Illustration.module.css';

interface Props {
  letter: LetterType // todo force ;
}

export function Illustration({ letter }: Props) {
  const [word, wordTransliteration, wordTranslation, imageName] = wordExamples[letter.lowercase];

  const imagePath = `/pictures/words/${imageName}.jpg`;

  return (
    <div>
      <ImageListItem>
        <Paper
          className={styles.imageWrapper}
          elevation={2}
        >
          <img
            src={imagePath}
            alt={wordTransliteration}
            className={styles.image}
          />
        </Paper>
        <ImageListItemBar
          title={(
            <>
              <Typography display="block">
                <ArmenianText>
                  <HighlightedText
                    text={word}
                    highlights={letter.lowercase}
                    textCase="uppercase"
                  />
                </ArmenianText>
              </Typography>
              <Typography display="block">
                <ArmenianText>
                  <HighlightedText
                    text={word}
                    highlights={letter.lowercase}
                    textCase="lowercase"
                  />
                </ArmenianText>
              </Typography>
            </>
          )}
          subtitle={(
            <>
              <Typography variant="caption" display="block">
                <HighlightedText
                  text={wordTransliteration}
                  highlights={letter.transliteration}
                />
              </Typography>
              <Typography variant="caption" display="block">
                {wordTranslation}
              </Typography>
            </>
          )}
          position="below"
        />
      </ImageListItem>
    </div>
  );
}
