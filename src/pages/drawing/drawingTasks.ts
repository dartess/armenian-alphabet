import type { TaskUnit, LetterState, LetterType, TotalProgress } from '@/types/model';
import type { GetRandomItemOptions } from '@/utils/getRandomItem';
import { getRandomItem } from '@/utils/getRandomItem';
import { alphabet } from '@/constants/alphabet';

export type DrawingKey = `drawing-${TaskUnit}-${TaskUnit}`;

type TaskDrawing = {
  from: TaskUnit;
  to: Exclude<TaskUnit, 'meta'>;
};

// todo rewrite on satisfies

export const drawingTypes: Partial<Record<DrawingKey, TaskDrawing>> = {
  'drawing-meta-lowercase': {
    from: 'meta',
    to: 'lowercase',
  },
  'drawing-meta-uppercase': {
    from: 'meta',
    to: 'uppercase',
  },
  'drawing-lowercase-uppercase': {
    from: 'lowercase',
    to: 'uppercase',
  },
  'drawing-uppercase-lowercase': {
    from: 'uppercase',
    to: 'lowercase',
  },
};

const weightsByProgress: Record<LetterState, number> = {
  done: 1,
  new: 0,
  progress: 4,
};

function isValidDrawingQuestion(letter: LetterType, taskKey: DrawingKey): boolean {
  const { to: unitTo } = drawingTypes[taskKey]!;
  return unitTo !== 'uppercase' || letter.uppercase !== 'Եվ';
}

export function getDrawingQuestion(taskKey: DrawingKey, totalProgress: TotalProgress) {
  const getWeight = (letter: LetterType) => {
    const progress = totalProgress[letter.lowercase];
    return weightsByProgress[progress];
  };

  let questionLetter: LetterType | null = null;
  do {
    const letter = getRandomItem(alphabet, { getWeight });
    if (isValidDrawingQuestion(letter, taskKey)) {
      questionLetter = letter;
    }
  } while (!questionLetter);

  const { from: unitFrom, to: unitTo } = drawingTypes[taskKey]!;

  return {
    questionLetter,
    unitFrom,
    unitTo,
  };
}

const drawingTypeKeys = Object.keys(drawingTypes) as Array<keyof typeof drawingTypes>;

export function getRandomDrawingTypeKey(
  options: GetRandomItemOptions<DrawingKey> = {},
): DrawingKey {
  return getRandomItem(drawingTypeKeys, options);
}
