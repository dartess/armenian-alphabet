import { alphabet } from '../../alphabet';
import { Letter } from "../Letter/Letter";
import { LetterView } from "../LetterView/LetterView";
import { LetterType, TotalProgress } from "../../model";

import styles from './Alphabet.module.css';
import { useEffect, useState } from "react";

export function Alphabet() {
  const [openedLetter, setOpenedLetter] = useState<LetterType | null>(null);

  const [totalProgress, setTotalProgress] = useState<TotalProgress>(() => {
    const totalProgressFromStorage = localStorage.getItem('progress');
    if (totalProgressFromStorage) {
      return JSON.parse(totalProgressFromStorage);
    }
    return Object.fromEntries(alphabet.map(letter => [letter.uppercase, 'new']));
  });

  useEffect(() => {
    localStorage.setItem('progress', JSON.stringify(totalProgress));
  }, [totalProgress])

  return <div>
    <ol className={styles.root}>
      {alphabet.map((letter) => {
        return <li
          key={letter.uppercase}
          className={styles.letter}
          onClick={() => setOpenedLetter(letter)}
        >
          <Letter {...letter} state={totalProgress[letter.uppercase]} />
        </li>
      })}
    </ol>
    {openedLetter && <LetterView
        openedLetter={openedLetter}
        onClose={() => setOpenedLetter(null)}
        onStateChange={(state) => {
          setTotalProgress({
            ...totalProgress,
            [openedLetter.uppercase]: state
          });
        }}
        state={totalProgress[openedLetter.uppercase]}
    />}
  </div>
}
