import cn from 'classnames';

import styles from './Link.module.css';

type Props = {
  href?: string;
  color?: 'primary' | 'secondary';
  children: string;
  rel?: string;
  target?: string;
  onClick?: () => void;
};

export const Link = ({ href, color = 'primary', children, rel, target, onClick }: Props) => {
  const className = cn(styles.root, styles[`color-${color}`]);
  const Tag = href ? 'a' : 'span';
  return (
    <Tag href={href} className={className} rel={rel} target={target} onClick={onClick}>
      {children}
    </Tag>
  );
};
