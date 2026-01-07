import { useAudio } from 'react-use';
import { MdOutlinePlayCircleOutline } from 'react-icons/md';

import type { LetterType } from '@/types/model';
import { reachGoal } from '@/utils/reachGoal';

import styles from './LetterAudio.module.css';

type Props = {
  letter: LetterType;
};

export function LetterAudio({ letter: { lowercase, audio } }: Props) {
  const [audioElement, state, controls] = useAudio({ src: `/audio/letters/${audio}.mp3` });

  const handlePlay = () => {
    controls.play();
    reachGoal('cardPlaySound', { letter: lowercase });
  };

  return (
    <>
      <button
        aria-label="прослушать"
        onClick={handlePlay}
        disabled={state.playing}
        type="button"
        className={styles.root}
      >
        <MdOutlinePlayCircleOutline className={styles.icon} />
      </button>
      {audioElement}
    </>
  );
}
