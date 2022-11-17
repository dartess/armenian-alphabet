import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import type { LetterState, LetterType } from '@/types/model';
import { toArray } from '@/utils/toArray';
import { ArmenianText } from '@/components/ArmenianText/ArmenianText';

import styles from './Letter.module.css';

type Props = Omit<LetterType, 'id'> & {
  state?: LetterState;
};

export function Letter({ uppercase, lowercase, transliteration, ipa, state }: Props) {
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
          <ArmenianText>{uppercase}</ArmenianText>
          {' '}
          <ArmenianText>{lowercase}</ArmenianText>
        </div>
        <div className={styles.info}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {toArray(transliteration).join(', ')}
            <Divider
              orientation="vertical"
              flexItem
              sx={{ margin: '0 7px' }}
            />
            {toArray(ipa).map((ipaItem) => `[${ipaItem}]`).join(', ')}
          </Box>
        </div>
      </Box>
    </div>
  );
}
