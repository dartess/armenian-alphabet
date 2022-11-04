import { observer } from 'mobx-react-lite';
import Button from '@mui/material/Button';
import { useConfirm } from 'material-ui-confirm';

import { useStore } from '@/core/stores';

export const ResetButton = observer(() => {
  const { resetProgress } = useStore('progress');

  const confirm = useConfirm();

  const handleClick = () => {
    confirm({
      title: 'Стереть все данные',
      description: 'Вы действительно хотите сбросить прогресс и настройки?',
      cancellationText: 'Отменить',
      confirmationText: 'Стереть',
    })
      .then(resetProgress);
  };

  return <Button color="warning" variant="outlined" onClick={handleClick}>Стереть данные</Button>;
});
