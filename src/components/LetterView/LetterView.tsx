import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import NotListedLocationOutlinedIcon from '@mui/icons-material/NotListedLocationOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';

import { LetterType, LetterState } from '@/types/model';

import { Letter } from '../Letter/Letter';

import styles from './LetterView.module.css';

interface Props {
  isOpenLetterView: boolean;
  openedLetter: LetterType | null;
  onClose: () => void;
  onStateChange: (state: LetterState) => void;
  state: LetterState;
}

const statusTexts: Record<LetterState, string> = {
  new: 'новая буква',
  progress: 'изучаю',
  done: 'выучил!',
};

export function LetterView({ isOpenLetterView, openedLetter, onClose, state, onStateChange }: Props) {
  if (!openedLetter) {
    return null;
  }
  return (
    <Dialog open={isOpenLetterView} onClose={onClose}>
      <div className={styles.root}>
        <h4 className={styles.name}>{openedLetter.name}</h4>
        <div className={styles.basicLetter}>
          <Letter
            uppercase={openedLetter.uppercase}
            lowercase={openedLetter.lowercase}
            name={openedLetter.name}
            transliteration={openedLetter.transliteration}
            ipa={openedLetter.ipa}
          />
        </div>
        <div className={styles.state}>
          <ButtonGroup size="large">
            <Button
              variant={state === 'new' ? 'contained' : 'outlined'}
              onClick={() => onStateChange('new')}
            >
              <NotListedLocationOutlinedIcon />
            </Button>
            <Button
              variant={state === 'progress' ? 'contained' : 'outlined'}
              onClick={() => onStateChange('progress')}
            >
              <SchoolOutlinedIcon />
            </Button>
            <Button
              variant={state === 'done' ? 'contained' : 'outlined'}
              onClick={() => onStateChange('done')}
            >
              <DoneOutlinedIcon />
            </Button>
          </ButtonGroup>
        </div>
        <div className={styles.stateText}>
          {statusTexts[state]}
        </div>
      </div>
    </Dialog>
  );
}
