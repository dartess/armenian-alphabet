import { useId } from 'react';
import { Radio } from '@base-ui/react/radio';
import { RadioGroup as BaseUiRadioGroup } from '@base-ui/react/radio-group';

import styles from './RadioGroup.module.css';

type Props = {
  items: Array<{
    label: string;
    value: string;
  }>;
  value: string;
  onChange: (value: unknown) => void;
};

export const RadioGroup = ({ items, value, onChange }: Props) => {
  const id = useId();
  return (
    <BaseUiRadioGroup
      aria-labelledby={id}
      value={value}
      onValueChange={onChange}
      className={styles.root}
    >
      {items.map((item) => (
        <label className={styles.item} key={item.value}>
          <Radio.Root value={item.value} className={styles.radio}>
            <Radio.Indicator className={styles.indicator} />
          </Radio.Root>
          {item.label}
        </label>
      ))}
    </BaseUiRadioGroup>
  );
};
export type { Props as RadioGroupProps };
