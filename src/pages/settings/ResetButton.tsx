import { observer } from 'mobx-react-lite';
import { useConfirm } from 'material-ui-confirm';
import { MdDeleteForever } from 'react-icons/md';

import { Button } from '@/components/Button/Button';
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
    <Button variant="secondary" onClick={handleClick} endIcon={<MdDeleteForever />}>
      Стереть данные
    </Button>
  );
});
