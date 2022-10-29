import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { LetterType, LetterState } from "@/types/model";

import styles from './LetterView.module.css'
import { Letter } from "../Letter/Letter";

type Props = {
  isOpenLetterView: boolean;
  openedLetter: LetterType | null;
  onClose: () => void;
  onStateChange: (state: LetterState) => void;
  state: LetterState;
}

const statusTexts: Record<LetterState, string> = {
  new: 'новая буква',
  progress: 'изучаю',
  done: 'выучил!'
}

export function LetterView({ isOpenLetterView, openedLetter, onClose, state, onStateChange }: Props) {
  if (!openedLetter) {
    return null;
  }
  return <Dialog open={isOpenLetterView} onClose={onClose}>
    <div className={styles.root}>
      <h4 className={styles.name}>{openedLetter.name}</h4>
      <div className={styles.basicLetter}>
        <Letter {...openedLetter} />
      </div>
      <div className={styles.state}>
        <ButtonGroup>
          <Button
            variant={state === 'new' ? 'contained' : 'outlined'}
            onClick={() => onStateChange('new')}
          >
            <span className={styles.buttonText}>
              🆕
            </span>
          </Button>
          <Button
            variant={state === 'progress' ? 'contained' : 'outlined'}
            onClick={() => onStateChange('progress')}
          >
            <span className={styles.buttonText}>
              🎓
            </span>
          </Button>
          <Button
            variant={state === 'done' ? 'contained' : 'outlined'}
            onClick={() => onStateChange('done')}
          >
            <span className={styles.buttonText}>
              ✅
            </span>
          </Button>
        </ButtonGroup>
      </div>
      <div className={styles.stateText}>
        {statusTexts[state]}
      </div>
    </div>
  </Dialog>
}
