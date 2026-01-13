import { MdThumbUpOffAlt, MdThumbDownOffAlt } from 'react-icons/md';
import cn from 'classnames';

import styles from './ResultIcon.module.css';

type Props = {
  result: 'correct' | 'wrong';
};

const iconsByResult = {
  correct: MdThumbUpOffAlt,
  wrong: MdThumbDownOffAlt,
};

export const ResultIcon = ({ result }: Props) => {
  const Icon = iconsByResult[result];
  return <Icon className={cn(styles.root, styles[result])} />;
};
