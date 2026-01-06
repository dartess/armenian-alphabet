import { MdThumbUpOffAlt, MdThumbDownOffAlt } from 'react-icons/md';

import { exhaustiveCheck } from '@/utils/exhaustiveCheck';

type Props = {
  result: 'correct' | 'wrong';
};

export const ResultIcon = ({ result }: Props) => {
  switch (result) {
    case 'correct':
      return <MdThumbUpOffAlt style={{ color: 'var(--color-success)', fontSize: '24px' }} />;
    case 'wrong':
      return <MdThumbDownOffAlt style={{ color: 'var(--color-warning)', fontSize: '24px' }} />;
    default:
      exhaustiveCheck(result);
  }
};
