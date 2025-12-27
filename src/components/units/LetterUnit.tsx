import type { LetterType, TaskUnit } from '@/types/model';
import { exhaustiveCheck } from '@/utils/exhaustiveCheck';

import { LetterTransliteration } from './LetterTransliteration';
import { LetterIpa } from './LetterIpa';
import { LetterUppercase } from './LetterUppercase';
import { LetterLowercase } from './LetterLowercase';

type Props = {
  unit: TaskUnit;
  letter: LetterType;
  showVariants: boolean;
};

export function LetterUnit({ letter, showVariants, unit }: Props) {
  switch (unit) {
    case 'uppercase':
      return <LetterUppercase letter={letter} showVariants={showVariants} />;
    case 'lowercase':
      return <LetterLowercase letter={letter} />;
    case 'meta':
      return (
        <>
          <LetterTransliteration letter={letter} showVariants={showVariants} />{' '}
          <LetterIpa letter={letter} showVariants={showVariants} />
        </>
      );
    default:
      exhaustiveCheck(unit);
  }
}
