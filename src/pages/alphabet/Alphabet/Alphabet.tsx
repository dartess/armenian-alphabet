import { alphabet } from '@/constants/alphabet';
import { Letter } from "@/components/Letter/Letter";
import { LetterView } from "@/components/LetterView/LetterView";
import { LetterType, TotalProgress } from "@/types/model";

import styles from './Alphabet.module.css';
import { useEffect, useState } from "react";

export function Alphabet() {
  const [isOpenLetterView, setIsOpenLetterView] = useState(false);
  const [lastOpenedLetter, setLastOpenedLetter] = useState<LetterType | null>(null);

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

  return <>
    <ol className={styles.list}>
      {alphabet.map((letter) => <li
        key={letter.uppercase}
        className={styles.letter}
        onClick={() => {
          setLastOpenedLetter(letter);
          setIsOpenLetterView(true);
        }}
      >
        <Letter {...letter} state={totalProgress[letter.uppercase]}/>
      </li>)}
    </ol>
    {lastOpenedLetter && <LetterView
        isOpenLetterView={isOpenLetterView}
        openedLetter={lastOpenedLetter}
        onClose={() => setIsOpenLetterView(false)}
        onStateChange={(state) => {
          setTotalProgress({
            ...totalProgress,
            [lastOpenedLetter.uppercase]: state
          });
        }}
        state={totalProgress[lastOpenedLetter.uppercase]}
    />}
  </>
}
