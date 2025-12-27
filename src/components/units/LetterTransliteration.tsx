import type { LetterType } from '@/types/model';

import { useVariantsPrint } from './useVariantsPrint';

type Props = {
  letter: LetterType;
  showVariants: boolean;
};

export function LetterTransliteration({ letter: { transliteration }, showVariants }: Props) {
  return <>{useVariantsPrint(transliteration, showVariants, ', ')}</>;
}
