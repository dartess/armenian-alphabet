import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { LetterType, LetterState } from "../../model";

import styles from './LetterView.module.css'
import { Letter } from "../Letter/Letter";

type Props = {
  openedLetter: LetterType | null;
  onClose: () => void;
  onStateChange: (state: LetterState) => void;
  state: LetterState;
}

export function LetterView({ openedLetter, onClose, state, onStateChange }: Props) {
  return <Dialog open={Boolean(openedLetter)} onClose={onClose}>
    {openedLetter &&
        <div className={styles.root}>
            <h4>{openedLetter.name}</h4>
            <div className={styles.basicLetter}>
                <Letter {...openedLetter} />
            </div>
            <div className={styles.state}>
                <ButtonGroup size='small'>
                    <Button
                        variant={state === 'new' ? 'contained' : 'outlined'}
                        onClick={() => onStateChange('new')}
                    >
                        ❓
                    </Button>
                    <Button
                        variant={state === 'progress' ? 'contained' : 'outlined'}
                        onClick={() => onStateChange('progress')}
                    >
                        🤔
                    </Button>
                    <Button
                        variant={state === 'done' ? 'contained' : 'outlined'}
                        onClick={() => onStateChange('done')}
                    >
                        ✅
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    }
  </Dialog>
}
