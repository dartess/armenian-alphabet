import type { ComponentPropsWithoutRef } from 'react';
import Link from '@mui/material/Link';

type Props = Omit<ComponentPropsWithoutRef<typeof Link>, 'rel' | 'target'>;

export function LinkExternal(props: Props) {
  return <Link {...props} rel="noopener noreferrer" target="_blank" />;
}
