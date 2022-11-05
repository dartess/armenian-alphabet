import { useState } from 'react';

import { getRandomQuizTypeKey } from './quizTasks';
import { QuizTask } from './QuizTask/QuizTask';

export function Quiz() {
  const [quizKey, setQuizKey] = useState(getRandomQuizTypeKey);
  const handleNextQuiz = () => setQuizKey(getRandomQuizTypeKey({ exclude: [quizKey] }));

  return (
    <QuizTask
      quizKey={quizKey}
      onNextQuiz={handleNextQuiz}
    />
  );
}
