import type { LetterType } from '@/types/model';

import { useVariantsPrint } from './useVariantsPrint';

type Props = {
  letter: LetterType;
  showVariants: boolean;
}

const mapIpa = (ipaItem: string) => `[${ipaItem}]`;

export function LetterIpa({ letter: { ipa }, showVariants }: Props) {
  return <>{useVariantsPrint(ipa, showVariants, ', ', mapIpa)}</>;
}
