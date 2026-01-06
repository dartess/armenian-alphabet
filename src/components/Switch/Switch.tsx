import { Switch as BaseUiSwitch } from '@base-ui/react/switch';

import styles from './Switch.module.css';

type Props = { checked: boolean; onCheckedChange: (checked: boolean) => void };

export const Switch = ({ checked, onCheckedChange }: Props) => {
  return (
    <BaseUiSwitch.Root checked={checked} className={styles.root} onCheckedChange={onCheckedChange}>
      <BaseUiSwitch.Thumb className={styles.thumb} />
    </BaseUiSwitch.Root>
  );
};
