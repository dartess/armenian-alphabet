import type { PageValue } from '@/types/model';
import { Alphabet } from '@/pages/alphabet/Alphabet/Alphabet';
import { Practice } from '@/pages/practice/Practice';
import { Settings } from '@/pages/settings/Settings';
import { exhaustiveCheck } from '@/utils/exhaustiveCheck';

interface Props {
  page: PageValue;
}

export function Router({ page }: Props) {
  switch (page) {
    case 'alphabet':
      return <Alphabet />;
    case 'practice':
      return <Practice />;
    case 'settings':
      return <Settings />;
    default:
      return exhaustiveCheck(page);
  }
}
