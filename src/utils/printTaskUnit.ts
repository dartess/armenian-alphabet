import type { LetterType, TaskUnit } from '@/types/model';
import { toArray } from '@/utils/toArray';

function getMetaPrintByLetter(letter: LetterType) {
  return `${toArray(letter.transliteration).join(', ')} ${toArray(letter.ipa).map((ipa) => `[${ipa}]`).join(', ')}`;
}

export function printTaskUnit(letter: LetterType, unit: TaskUnit) {
  return unit === 'meta' ? getMetaPrintByLetter(letter) : letter[unit];
}
