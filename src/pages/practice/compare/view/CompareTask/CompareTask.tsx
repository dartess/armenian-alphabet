import { useEffect, useMemo, useState } from "react";
import Button from '@mui/material/Button';
import { TaskKey } from "@/pages/practice/tasks";

import styles from './CompareTask.module.css';
import { getCompareTaskQuestion, printTaskCompareUnit } from "@/pages/practice/compare/compareTasks";
import { Letter } from "@/components/Letter/Letter";

type Props = {
  taskKey: TaskKey;
  onNextTask: () => void;
}

export const CompareTask = ({ taskKey, onNextTask }: Props) => {
  const [userAnswerId, setUserAnswerId] = useState<null | string>(null)

  useEffect(
    () => setUserAnswerId(null),
    [taskKey]
  );

  const { questionLetter, answerLetters, unitFrom, unitTo } = useMemo(
    () => getCompareTaskQuestion(taskKey),
    [taskKey]
  );

  return <div className={styles.root}>
    <div className={styles.question}>
      <div className={styles.questionUnit}>
        {printTaskCompareUnit(questionLetter, unitFrom)}
      </div>
      {answerLetters.map(answerLetterItem => {
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
        )
      })}
    </div>
    {userAnswerId && <div className={styles.results}>
        <div className={styles.letter}>
            <Letter {...questionLetter} />
        </div>
        <div className={styles.actions}>
            <Button
                onClick={onNextTask}
                type="button"
                variant="outlined"
            >
                Дальше
            </Button>
        </div>
    </div>}
  </div>
}
