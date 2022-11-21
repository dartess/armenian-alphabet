import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { observer } from 'mobx-react-lite';

import type { LetterType, LetterState } from '@/types/model';
import { alphabet } from '@/constants/alphabet';
import { LetterUnit } from '@/components/units/LetterUnit';

import { Letter } from '../Letter/Letter';

import styles from './LetterView.module.css';

interface Props {
  isOpenLetterView: boolean;
  openedLetter: LetterType;
  onClose: () => void;
  onStateChange: (state: LetterState) => void;
  onChangeLetter: (letter: LetterType) => void;
  state: LetterState;
}

const statusTexts: Record<LetterState, string> = {
  new: 'новая буква',
  progress: 'изучаю',
  done: 'выучил!',
};

function getNextLetter(currentLetter: LetterType): LetterType {
  const currentLetterIndex = alphabet.findIndex((letter) => letter.id === currentLetter.id);
  const nextLetterIndex = currentLetterIndex + 1;
  return alphabet[nextLetterIndex < alphabet.length ? nextLetterIndex : 0];
}

function getPrevLetter(currentLetter: LetterType): LetterType {
  const currentLetterIndex = alphabet.findIndex((letter) => letter.id === currentLetter.id);
  const prevLetterIndex = currentLetterIndex - 1;
  return alphabet[prevLetterIndex >= 0 ? prevLetterIndex : alphabet.length - 1];
}

export const LetterView = observer(function LetterView({
  isOpenLetterView,
  openedLetter,
  onClose,
  state,
  onStateChange,
  onChangeLetter,
}: Props) {
  const prevLetter = getPrevLetter(openedLetter);
  const nextLetter = getNextLetter(openedLetter);
  const handleClickPrev = () => onChangeLetter(prevLetter);
  const handleClickNext = () => onChangeLetter(nextLetter);

  const handleStateChange = (clickedState: LetterState) => {
    const newState = state !== clickedState ? clickedState : 'new';
    onStateChange(newState);
  };

  return (
    <Dialog open={isOpenLetterView} onClose={onClose} fullWidth>
      <div className={styles.root}>
        <div className={styles.content}>
          <h4 className={styles.name}>{openedLetter.name}</h4>
          <div className={styles.basicLetter}>
            <Letter
              letter={openedLetter}
              showVariants
            />
          </div>
          <div className={styles.state}>
            <ButtonGroup size="medium">
              <Button
                variant={state === 'progress' ? 'contained' : 'outlined'}
                onClick={() => handleStateChange('progress')}
              >
                <SchoolOutlinedIcon />
              </Button>
              <Button
                variant={state === 'done' ? 'contained' : 'outlined'}
                onClick={() => handleStateChange('done')}
              >
                <DoneOutlinedIcon />
              </Button>
            </ButtonGroup>
          </div>
          <div className={styles.stateText}>
            {statusTexts[state]}
          </div>
        </div>
        <ButtonGroup
          variant="text"
          color="primary"
          size="large"
          className={styles.navigation}
          fullWidth
        >
          <Button
            onClick={handleClickPrev}
            startIcon={<NavigateNextIcon className={styles.navigatePrev} />}
          >
            <LetterUnit
              unit="uppercase"
              letter={prevLetter}
              showVariants={false}
            />
          </Button>
          <Button
            onClick={handleClickNext}
            endIcon={<NavigateNextIcon />}
          >
            <LetterUnit
              unit="uppercase"
              letter={nextLetter}
              showVariants={false}
            />
          </Button>
        </ButtonGroup>
      </div>
    </Dialog>
  );
});
