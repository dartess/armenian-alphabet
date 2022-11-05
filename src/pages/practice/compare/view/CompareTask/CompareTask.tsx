import { useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';

import type { LetterState } from '@/types/model';
import type { TaskKey } from '@/pages/practice/tasks';
import { getCompareTaskQuestion, printTaskCompareUnit } from '@/pages/practice/compare/compareTasks';
import { Letter } from '@/components/Letter/Letter';
import { useStore } from '@/core/stores';

import styles from './CompareTask.module.css';

interface Props {
  taskKey: TaskKey;
  onNextTask: () => void;
}

type UncompletedLetterState = Exclude<LetterState, 'done'>;

const updateStateLabels: Record<UncompletedLetterState, string> = { new: 'изучаю', progress: 'выучил' };

const updateStateNextValue: Record<UncompletedLetterState, LetterState> = { new: 'progress', progress: 'done' };

export function CompareTask({ taskKey, onNextTask }: Props) {
  const [userAnswerId, setUserAnswerId] = useState<null | string>(null);

  const { questionLetter, answerLetters, unitFrom, unitTo } = useMemo(
    () => getCompareTaskQuestion(taskKey),
    [taskKey],
  );

  const { totalProgress, setLetterProgress } = useStore('progress');
  const progress = totalProgress[questionLetter.lowercase];

  const [isUpdateState, setIsUpdateState] = useState(false);

  const handleNext = () => {
    setUserAnswerId(null);
    setIsUpdateState(false);
    if (isUpdateState) {
      setLetterProgress(questionLetter, updateStateNextValue[progress as UncompletedLetterState]);
    }
    onNextTask();
  };

  return (
    <div className={styles.root}>
      <div className={styles.question}>
        <div className={styles.questionUnit}>
          {printTaskCompareUnit(questionLetter, unitFrom)}
        </div>
        {answerLetters.map((answerLetterItem) => {
          const color = (() => {
            if (!userAnswerId) {
              return undefined;
            }
            if (questionLetter.id === answerLetterItem.id) {
              return 'success';
            }
            if (userAnswerId === answerLetterItem.id) {
              return 'error';
            }
            return undefined;
          })();
          return (
            <Button
              key={answerLetterItem.id}
              onClick={() => {
                if (userAnswerId) {
                  return;
                }
                setUserAnswerId(answerLetterItem.id);
              }}
              type="button"
              variant="contained"
              size="large"
              color={color}
              className={styles.answerUnit}
            >
              {printTaskCompareUnit(answerLetterItem, unitTo)}
            </Button>
          );
        })}
      </div>
      {userAnswerId && (
        <div className={styles.results}>
          <div className={styles.letter}>
            <Letter
              uppercase={questionLetter.uppercase}
              lowercase={questionLetter.lowercase}
              name={questionLetter.name}
              transliteration={questionLetter.transliteration}
              ipa={questionLetter.ipa}
            />
          </div>
          <div className={styles.actions}>
            <Button
              onClick={handleNext}
              type="button"
              variant="outlined"
            >
              Дальше
            </Button>
            {progress !== 'done' && (
              <Box>
                <FormControlLabel
                  control={<Switch checked={isUpdateState} onChange={(_, checked) => setIsUpdateState(checked)} />}
                  label={updateStateLabels[progress]}
                />
              </Box>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
