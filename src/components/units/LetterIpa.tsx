import type { LetterType } from '@/types/model';

import { useVariantsPrint } from './useVariantsPrint';

interface Props {
  letter: LetterType;
  showVariants: boolean;
}

const mapIpa = (ipaItem: string) => `[${ipaItem}]`;

export function LetterIpa({ letter: { transliteration }, showVariants }: Props) {
  return <>{useVariantsPrint(transliteration, showVariants, ', ', mapIpa)}</>;
}
