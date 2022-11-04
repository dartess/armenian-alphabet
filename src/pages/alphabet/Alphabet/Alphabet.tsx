import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { alphabet } from '@/constants/alphabet';
import { Letter } from '@/components/Letter/Letter';
import { LetterView } from '@/components/LetterView/LetterView';
import { LetterType } from '@/types/model';

import styles from './Alphabet.module.css';
import { useStore } from '@/core/stores';

export const Alphabet = observer(() => {
  const [isOpenLetterView, setIsOpenLetterView] = useState(false);
  const [lastOpenedLetter, setLastOpenedLetter] = useState<LetterType | null>(null);

  const { totalProgress, setLetterProgress } = useStore('progress');

  return (
    <>
      <ol className={styles.list}>
        {alphabet.map((letter) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions -- todo
          <li
            key={letter.lowercase}
            className={styles.letter}
            onClick={() => {
              setLastOpenedLetter(letter);
              setIsOpenLetterView(true);
            }}
          >
            <Letter
              uppercase={letter.uppercase}
              lowercase={letter.lowercase}
              name={letter.name}
              transliteration={letter.transliteration}
              ipa={letter.ipa}
              state={totalProgress[letter.lowercase]}
            />
          </li>
        ))}
      </ol>
      {lastOpenedLetter && (
        <LetterView
          isOpenLetterView={isOpenLetterView}
          openedLetter={lastOpenedLetter}
          onClose={() => setIsOpenLetterView(false)}
          onStateChange={(state) => setLetterProgress(lastOpenedLetter, state)}
          state={totalProgress[lastOpenedLetter.lowercase]}
        />
      )}
    </>
  );
});
