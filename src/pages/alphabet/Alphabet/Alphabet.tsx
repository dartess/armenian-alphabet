import { alphabet } from '@/constants/alphabet';
import { Letter } from "@/components/Letter/Letter";
import { LetterView } from "@/components/LetterView/LetterView";
import { LetterType } from "@/types/model";

import styles from './Alphabet.module.css';
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/core/stores";

export const Alphabet = observer(function Alphabet() {
  const [isOpenLetterView, setIsOpenLetterView] = useState(false);
  const [lastOpenedLetter, setLastOpenedLetter] = useState<LetterType | null>(null);

  const { totalProgress, setLetterProgress } = useStore('progress');

  return <>
    <ol className={styles.list}>
      {alphabet.map((letter) => <li
        key={letter.lowercase}
        className={styles.letter}
        onClick={() => {
          setLastOpenedLetter(letter);
          setIsOpenLetterView(true);
        }}
      >
        <Letter {...letter} state={totalProgress[letter.lowercase]}/>
      </li>)}
    </ol>
    {lastOpenedLetter && <LetterView
        isOpenLetterView={isOpenLetterView}
        openedLetter={lastOpenedLetter}
        onClose={() => setIsOpenLetterView(false)}
        onStateChange={(state) => setLetterProgress(lastOpenedLetter, state)}
        state={totalProgress[lastOpenedLetter.lowercase]}
    />}
  </>
});
