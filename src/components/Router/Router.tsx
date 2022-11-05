import type { PageValue } from '@/types/model';
import { Alphabet } from '@/pages/alphabet/Alphabet/Alphabet';
import { Quiz } from '@/pages/quiz/Quiz';
import { Settings } from '@/pages/settings/Settings';
import { exhaustiveCheck } from '@/utils/exhaustiveCheck';

interface Props {
  page: PageValue;
}

export function Router({ page }: Props) {
  switch (page) {
    case 'alphabet':
      return <Alphabet />;
    case 'quiz':
      return <Quiz />;
    case 'settings':
      return <Settings />;
    default:
      return exhaustiveCheck(page);
  }
}
