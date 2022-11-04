import { LetterState, LetterType } from "@/types/model";
import styles from './Letter.module.css';
import { toArray } from "@/utils/toArray";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

type Props = LetterType & {
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
    }
  })();
  return <div className={styles.root}>
    <Box sx={{ color }}>
      <div>{uppercase} {lowercase}</div>
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
            orientation='vertical'
            flexItem
            sx={{
              margin: '0 7px'
            }}
          />
          {toArray(ipa).map(ipaItem => `[${ipaItem}]`).join(', ')}
        </Box>
      </div>
    </Box>
  </div>
}
