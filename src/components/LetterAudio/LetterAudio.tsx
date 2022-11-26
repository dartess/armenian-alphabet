import { useAudio } from 'react-use';
import IconButton from '@mui/material/IconButton';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import type { LetterType } from '@/types/model';

interface Props {
  letter: LetterType;
}

export function LetterAudio({ letter: { audio } }: Props) {
  const [audioElement, state, controls] = useAudio({ src: `/audio/letters/${audio}.mp3` });

  return (
    <>
      <IconButton
        aria-label="прослушать"
        size="small"
        onClick={() => controls.play()}
        disabled={state.playing}
      >
        <PlayCircleOutlineIcon fontSize="inherit" />
      </IconButton>
      {audioElement}
    </>
  );
}
