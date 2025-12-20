import { observer } from 'mobx-react-lite';
import Button from '@mui/material/Button';
import { useConfirm } from 'material-ui-confirm';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useStore } from '@/core/stores';

export const ResetButton = observer(function ResetButton() {
  const { resetProgress } = useStore('progress');

  const confirm = useConfirm();

  const handleClick = () => {
    confirm({
      title: 'Стереть все данные',
      description: 'Вы действительно хотите сбросить прогресс и настройки?',
      cancellationText: 'Отменить',
      confirmationText: 'Стереть',
    })
      .then(resetProgress)
      .catch(() => {
        // no cation required
      });
  };

  return (
    <Button
      variant="outlined"
      onClick={handleClick}
      endIcon={<DeleteForeverIcon />}
    >
      Стереть данные
    </Button>
  );
});
