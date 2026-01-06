import { MdOutlineSchool, MdOutlineDone, MdNavigateNext } from 'react-icons/md';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { Button } from '@/components/Button/Button';
import { Dialog } from '@/components/Dialog/Dialog';
import type { LetterType, LetterState } from '@/types/model';
import { alphabet } from '@/constants/alphabet';
import { LetterUnit } from '@/components/units/LetterUnit';
import { Illustration } from '@/components/Illustration/Illustration';
import { reachGoal } from '@/utils/reachGoal';

import { Letter } from '../Letter/Letter';

import styles from './LetterView.module.css';

type Props = {
  isOpenLetterView: boolean;
  openedLetter: LetterType;
  onClose: () => void;
  onStateChange: (state: LetterState) => void;
  onChangeLetter: (letter: LetterType) => void;
  state: LetterState;
};

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
  const handleClickPrev = () => {
    onChangeLetter(prevLetter);
  };
  const handleClickNext = () => {
    onChangeLetter(nextLetter);
  };

  const handleStateChange = (clickedState: LetterState) => {
    const newState = state !== clickedState ? clickedState : 'new';
    onStateChange(newState);
  };

  useEffect(() => {
    reachGoal('cardOpen', { letter: openedLetter.lowercase });
  }, [openedLetter]);

  return (
    <Dialog open={isOpenLetterView} onOpenChange={onClose}>
      <div className={styles.root}>
        <div className={styles.content}>
          <div className={styles.illustration}>
            <Illustration letter={openedLetter} />
          </div>
          <div className={styles.description}>
            <h4 className={styles.name}>{openedLetter.name}</h4>
            <div className={styles.basicLetter}>
              <Letter letter={openedLetter} showVariants />
            </div>
            <div className={styles.state}>
              <Button
                variant={state === 'progress' ? 'primary' : 'secondary'}
                onClick={() => {
                  handleStateChange('progress');
                }}
                icon={<MdOutlineSchool />}
              />
              <Button
                variant={state === 'done' ? 'primary' : 'secondary'}
                onClick={() => {
                  handleStateChange('done');
                }}
                icon={<MdOutlineDone />}
              />
            </div>
            <div className={styles.stateText}>{statusTexts[state]}</div>
          </div>
        </div>
        <div className={styles.navigation}>
          <Button
            onClick={handleClickPrev}
            startIcon={<MdNavigateNext className={styles.navigatePrev} />}
            variant="secondary"
          >
            <LetterUnit unit="uppercase" letter={prevLetter} showVariants={false} />
          </Button>
          <Button onClick={handleClickNext} endIcon={<MdNavigateNext />} variant="secondary">
            <LetterUnit unit="uppercase" letter={nextLetter} showVariants={false} />
          </Button>
        </div>
      </div>
    </Dialog>
  );
});
