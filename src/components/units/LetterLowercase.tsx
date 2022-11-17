import type { LetterType } from '@/types/model';
import { ArmenianText } from '@/components/ArmenianText/ArmenianText';

interface Props {
  letter: LetterType;
}

export function LetterLowercase({ letter: { lowercase } }: Props) {
  return <ArmenianText>{lowercase}</ArmenianText>;
}
