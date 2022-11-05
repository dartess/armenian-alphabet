import { useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';

import type { LetterState } from '@/types/model';
import { Letter } from '@/components/Letter/Letter';
import { useStore } from '@/core/stores';

import type { QuizKey } from '../quizTasks';
import { getQuizQuestion, printQuizUnit } from '../quizTasks';

import styles from './QuizTask.module.css';

interface Props {
  quizKey: QuizKey;
  onNextQuiz: () => void;
}

type UncompletedLetterState = Exclude<LetterState, 'done'>;

const updateStateLabels: Record<UncompletedLetterState, string> = { new: 'изучаю', progress: 'выучил' };

const updateStateNextValue: Record<UncompletedLetterState, LetterState> = { new: 'progress', progress: 'done' };

export function QuizTask({ quizKey, onNextQuiz }: Props) {
  const [userAnswerId, setUserAnswerId] = useState<null | string>(null);

  const { totalProgress, setLetterProgress } = useStore('progress');

  const { questionLetter, answerLetters, unitFrom, unitTo } = useMemo(
    () => getQuizQuestion(quizKey, totalProgress),
    [quizKey],
  );

  const progress = totalProgress[questionLetter.lowercase];

  const [isUpdateState, setIsUpdateState] = useState(false);

  const handleNext = () => {
    setUserAnswerId(null);
    setIsUpdateState(false);
    if (isUpdateState) {
      setLetterProgress(questionLetter, updateStateNextValue[progress as UncompletedLetterState]);
    }
    onNextQuiz();
  };

  return (
    <div className={styles.root}>
      <div className={styles.question}>
        <div className={styles.questionUnit}>
          {printQuizUnit(questionLetter, unitFrom)}
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
              {printQuizUnit(answerLetterItem, unitTo)}
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
