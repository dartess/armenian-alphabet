import { MdOutlinePlayCircleOutline } from 'react-icons/md';
import { useState } from 'react';

import type { LetterType } from '@/types/model';
import { reachGoal } from '@/utils/reachGoal';

import styles from './LetterAudio.module.css';

type Props = {
  letter: LetterType;
};

export function LetterAudio({ letter: { lowercase, audio } }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    const src = `/audio/letters/${audio}.mp3`;
    const audioInstance = new Audio(src);
    audioInstance.currentTime = 0; // с начала
    audioInstance.play();
    setIsPlaying(true);
    audioInstance.addEventListener('ended', () => {
      setIsPlaying(false);
    });

    reachGoal('cardPlaySound', { letter: lowercase });
  };

  return (
    <button
      aria-label="прослушать"
      onClick={handlePlay}
      disabled={isPlaying}
      type="button"
      className={styles.root}
    >
      <MdOutlinePlayCircleOutline className={styles.icon} />
    </button>
  );
}
