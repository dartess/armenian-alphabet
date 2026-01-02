import { observer } from 'mobx-react-lite';

import { useStore } from '@/core/stores';
import type { UserTheme } from '@/types/model';
import { RadioGroup } from '@/components/RadioGroup/RadioGroup';

export const ChangeTheme = observer(function ChangeTheme() {
  const { userTheme, setUserTheme } = useStore('settings');

  const handleChange = (value: unknown) => {
    setUserTheme(value as UserTheme);
  };

  return (
    <RadioGroup
      value={userTheme}
      onChange={handleChange}
      items={[
        {
          label: 'Системная',
          value: 'system',
        },
        {
          label: 'Светлая',
          value: 'light',
        },
        {
          label: 'Тёмная',
          value: 'dark',
        },
      ]}
    />
  );
});
