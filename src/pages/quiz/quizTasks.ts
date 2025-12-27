import type { GetRandomItemOptions } from '@/utils/getRandomItem';
import { getRandomItem } from '@/utils/getRandomItem';
import type { LetterState, LetterType, TotalProgress, TaskUnit } from '@/types/model';
import { alphabet } from '@/constants/alphabet';
import { shuffleOnPlaceArray } from '@/utils/shuffleOnPlaceArray';

export type QuizKey = `compare-${TaskUnit}-${TaskUnit}`;

type TaskQuiz = {
  from: TaskUnit;
  to: TaskUnit;
};

// todo rewrite on satisfies

export const quizTypes: Partial<Record<QuizKey, TaskQuiz>> = {
  'compare-meta-lowercase': {
    from: 'meta',
    to: 'lowercase',
  },
  'compare-meta-uppercase': {
    from: 'meta',
    to: 'uppercase',
  },
  'compare-lowercase-meta': {
    from: 'lowercase',
    to: 'meta',
  },
  'compare-lowercase-uppercase': {
    from: 'lowercase',
    to: 'uppercase',
  },
  'compare-uppercase-meta': {
    from: 'uppercase',
    to: 'meta',
  },
  'compare-uppercase-lowercase': {
    from: 'uppercase',
    to: 'lowercase',
  },
};

const ANSWERS_COUNT = 4;

const weightsByProgress: Record<LetterState, number> = {
  done: 1,
  new: 2,
  progress: 4,
};

export function getQuizQuestion(taskKey: QuizKey, totalProgress: TotalProgress) {
  const getWeight = (letter: LetterType) => {
    const progress = totalProgress[letter.lowercase];
    return weightsByProgress[progress];
  };

  const questionLetter = getRandomItem(alphabet, { getWeight });

  const answerLetters = [questionLetter];
  for (let i = 1; i <= ANSWERS_COUNT - 1; i += 1) {
    answerLetters.push(getRandomItem(alphabet, { exclude: answerLetters }));
  }
  shuffleOnPlaceArray(answerLetters);

  const { from: unitFrom, to: unitTo } = quizTypes[taskKey]!;

  return {
    questionLetter,
    answerLetters,
    unitFrom,
    unitTo,
  };
}

const quizTypeKeys = Object.keys(quizTypes) as Array<keyof typeof quizTypes>;

export function getRandomQuizTypeKey(options: GetRandomItemOptions<QuizKey> = {}): QuizKey {
  return getRandomItem(quizTypeKeys, options);
}
