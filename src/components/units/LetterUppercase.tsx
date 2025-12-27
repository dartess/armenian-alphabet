import type { LetterType } from '@/types/model';
import { ArmenianText } from '@/components/ArmenianText/ArmenianText';

import { useVariantsPrint } from './useVariantsPrint';

type Props = {
  letter: LetterType;
  showVariants: boolean;
};

export function LetterUppercase({ letter: { uppercase }, showVariants }: Props) {
  const print = useVariantsPrint(uppercase, showVariants, ' / ');
  return <ArmenianText>{print}</ArmenianText>;
}
