import { LetterType } from "@/types/model";
import { toArray } from "@/utils/toArray";
import { alphabet } from "@/constants/alphabet";
import { getRandomItem } from "@/utils/getRandomItem";

type TaskCompareUnit = 'meta' | 'lowercase' | 'uppercase';

export type TaskCompareKey = `compare-${TaskCompareUnit}-${TaskCompareUnit}`;

type TaskCompare = {
  type: 'compare';
  from: TaskCompareUnit;
  to: TaskCompareUnit;
}

// todo rewrite on satisfies

export const taskCompareTypes: Partial<Record<TaskCompareKey, TaskCompare>> = {
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
  return `${letter.transliteration} ${toArray(letter.ipa).map(ipa => `[${ipa}]`).join(', ')}`;
}

export function printTaskCompareUnit(letter: LetterType, unit: TaskCompareUnit) {
  return unit === 'meta' ? getMetaPrintByLetter(letter) : letter[unit];
}

const ANSWERS_COUNT = 4;

export function getCompareTaskQuestion(taskKey: TaskCompareKey) {
  const questionLetter = getRandomItem(alphabet);

  const answerLetters = [questionLetter];
  for (let i = 1; i <= ANSWERS_COUNT - 1; i++) {
    answerLetters.push(getRandomItem(alphabet, { exclude: answerLetters }));
  }

  const { from: unitFrom, to: unitTo } = taskCompareTypes[taskKey]!; // TODO remove !

  return {
    questionLetter,
    answerLetters,
    unitFrom,
    unitTo,
  }
}
