import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { Button } from '@/components/Button/Button';
import type { LetterState } from '@/types/model';
import { Letter } from '@/components/Letter/Letter';
import { useStore } from '@/core/stores';
import { LetterUnit } from '@/components/units/LetterUnit';
import { reachGoal } from '@/utils/reachGoal';

import type { QuizKey } from '../quizTasks';
import { getQuizQuestion } from '../quizTasks';

import styles from './QuizTask.module.css';

type Props = {
  quizKey: QuizKey;
  onNextQuiz: () => void;
};

type UncompletedLetterState = Exclude<LetterState, 'done'>;

const updateStateLabels: Record<UncompletedLetterState, string> = {
  new: 'изучаю',
  progress: 'выучил',
};

const updateStateNextValue: Record<UncompletedLetterState, LetterState> = {
  new: 'progress',
  progress: 'done',
};

export const QuizTask = observer(function QuizTask({ quizKey, onNextQuiz }: Props) {
  const [userAnswerId, setUserAnswerId] = useState<null | string>(null);

  const { totalProgress, setLetterProgress } = useStore('progress');

  const { questionLetter, answerLetters, unitFrom, unitTo } = useMemo(
    () => getQuizQuestion(quizKey, totalProgress),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO check it
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

  const answerStatus = (() => {
    if (!userAnswerId) {
      return 'none';
    }
    return questionLetter.id === userAnswerId ? 'correct' : 'wrong';
  })();

  useEffect(() => {
    switch (answerStatus) {
      case 'correct':
        reachGoal('quizCorrect');
        break;
      case 'wrong':
        reachGoal('quizWrong');
        break;
      // no default
    }
  }, [answerStatus]);

  return (
    <div className={styles.root}>
      <div className={styles.question}>
        <div className={styles.questionUnit}>
          <LetterUnit letter={questionLetter} unit={unitFrom} showVariants />
        </div>
        {answerLetters.map((answerLetterItem) => {
          const color = (() => {
            if (!userAnswerId) {
              return;
            }
            if (questionLetter.id === answerLetterItem.id) {
              return 'success';
            }
            if (userAnswerId === answerLetterItem.id) {
              return 'error';
            }
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
              status={color}
              className={styles.answerUnit}
            >
              <LetterUnit letter={answerLetterItem} unit={unitTo} showVariants={false} />
            </Button>
          );
        })}
      </div>
      {userAnswerId && (
        <div className={styles.results}>
          <div className={styles.letter}>
            <Letter letter={questionLetter} showVariants />
          </div>
          <div className={styles.actions}>
            <Button onClick={handleNext} variant="secondary">
              Дальше
            </Button>
            {progress !== 'done' && (
              <FormControlLabel
                control={
                  <Switch
                    checked={isUpdateState}
                    onChange={(_, checked) => {
                      setIsUpdateState(checked);
                    }}
                  />
                }
                label={updateStateLabels[progress]}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
});
