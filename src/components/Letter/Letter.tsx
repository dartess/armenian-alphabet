import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import type { LetterState, LetterType } from '@/types/model';
import { LetterUppercase } from '@/components/units/LetterUppercase';
import { LetterLowercase } from '@/components/units/LetterLowercase';
import { LetterTransliteration } from '@/components/units/LetterTransliteration';
import { LetterIpa } from '@/components/units/LetterIpa';

import styles from './Letter.module.css';

interface Props {
  letter: LetterType;
  state?: LetterState;
  showVariants: boolean;
}

export function Letter({ letter, state, showVariants }: Props) {
  const color = (() => {
    switch (state) {
      case 'new':
        return 'text.primary';
      case 'done':
        return 'text.secondary';
      case 'progress':
        return 'primary.main';
      default:
        return undefined;
    }
  })();

  return (
    <div className={styles.root}>
      <Box sx={{ color }}>
        <div>
          <LetterUppercase letter={letter} showVariants={showVariants} />
          {' '}
          <LetterLowercase letter={letter} />
        </div>
        <div className={styles.info}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <LetterTransliteration letter={letter} showVariants={showVariants} />
            <Divider
              orientation="vertical"
              flexItem
              sx={{ margin: '0 7px' }}
            />
            <LetterIpa letter={letter} showVariants={showVariants} />
          </Box>
        </div>
      </Box>
    </div>
  );
}
