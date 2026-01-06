import { useAudio } from 'react-use';
import IconButton from '@mui/material/IconButton';
import { MdOutlinePlayCircleOutline } from 'react-icons/md';

import type { LetterType } from '@/types/model';
import { reachGoal } from '@/utils/reachGoal';

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
      <IconButton
        aria-label="прослушать"
        size="small"
        onClick={handlePlay}
        disabled={state.playing}
      >
        <MdOutlinePlayCircleOutline />
      </IconButton>
      {audioElement}
    </>
  );
}
