import { getRandomItem } from '@/utils/getRandomItem';
import type { LetterState, LetterType, TotalProgress } from '@/types/model';
import { toArray } from '@/utils/toArray';
import { alphabet } from '@/constants/alphabet';
import { shuffleOnPlaceArray } from '@/utils/shuffleOnPlaceArray';

type TaskCompareUnit = 'meta' | 'lowercase' | 'uppercase';

export type QuizKey = `compare-${TaskCompareUnit}-${TaskCompareUnit}`;

interface TaskCompare {
  type: 'compare';
  from: TaskCompareUnit;
  to: TaskCompareUnit;
}

// todo rewrite on satisfies

export const quizTypes: Partial<Record<QuizKey, TaskCompare>> = {
  'compare-meta-lowercase': {
    type: 'compare',
    from: 'meta',
    to: 'lowercase',
  },
  'compare-meta-uppercase': {
    type: 'compare',
    from: 'meta',
    to: 'uppercase',
  },
  'compare-lowercase-meta': {
    type: 'compare',
    from: 'lowercase',
    to: 'meta',
  },
  'compare-lowercase-uppercase': {
    type: 'compare',
    from: 'lowercase',
    to: 'uppercase',
  },
  'compare-uppercase-meta': {
    type: 'compare',
    from: 'uppercase',
    to: 'meta',
  },
  'compare-uppercase-lowercase': {
    type: 'compare',
    from: 'uppercase',
    to: 'lowercase',
  },
};

function getMetaPrintByLetter(letter: LetterType) {
  return `${letter.transliteration} ${toArray(letter.ipa).map((ipa) => `[${ipa}]`).join(', ')}`;
}

export function printQuizUnit(letter: LetterType, unit: TaskCompareUnit) {
  return unit === 'meta' ? getMetaPrintByLetter(letter) : letter[unit];
}

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

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- todo remove `!`
  const { from: unitFrom, to: unitTo } = quizTypes[taskKey]!;

  return {
    questionLetter,
    answerLetters,
    unitFrom,
    unitTo,
  };
}

const quizTypeKeys = Object.keys(quizTypes) as Array<keyof typeof quizTypes>;

interface GetRandomQuizTypeOptions {
  exclude?: Array<QuizKey>;
}

export function getRandomQuizTypeKey(options: GetRandomQuizTypeOptions = {}): QuizKey {
  return getRandomItem(quizTypeKeys, options);
}
