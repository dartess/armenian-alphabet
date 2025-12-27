import { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { alphabet } from '@/constants/alphabet';
import { Letter } from '@/components/Letter/Letter';
import { LetterView } from '@/components/LetterView/LetterView';
import type { LetterType } from '@/types/model';
import { useStore } from '@/core/stores';

import styles from './Alphabet.module.css';

export const Alphabet = observer(function Alphabet() {
  const [isOpenLetterView, setIsOpenLetterView] = useState(false);
  const [lastOpenedLetter, setLastOpenedLetter] = useState<LetterType | null>(null);

  const { totalProgress, setLetterProgress } = useStore('progress');

  return (
    <>
      <ol className={styles.list}>
        {alphabet.map((letter) => (
          <li key={letter.lowercase} className={styles.letter}>
            <button
              type="button"
              onClick={() => {
                setLastOpenedLetter(letter);
                setIsOpenLetterView(true);
              }}
              className={styles.letterButton}
            >
              <Letter
                letter={letter}
                state={totalProgress[letter.lowercase]}
                showVariants={false}
              />
            </button>
          </li>
        ))}
      </ol>
      {lastOpenedLetter && (
        <LetterView
          isOpenLetterView={isOpenLetterView}
          openedLetter={lastOpenedLetter}
          onClose={() => {
            setIsOpenLetterView(false);
          }}
          onStateChange={(state) => {
            setLetterProgress(lastOpenedLetter, state);
          }}
          state={totalProgress[lastOpenedLetter.lowercase]}
          onChangeLetter={setLastOpenedLetter}
        />
      )}
    </>
  );
});
