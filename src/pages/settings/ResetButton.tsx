import { observer } from 'mobx-react-lite';
import { useToggle } from 'react-use';
import { MdDeleteForever } from 'react-icons/md';

import { Button } from '@/components/Button/Button';
import { useStore } from '@/core/stores';
import { AlertDialog } from '@/components/AlertDialog/AlertDialog';

export const ResetButton = observer(function ResetButton() {
  const { resetProgress } = useStore('progress');
  const [isOpen, toggleIsOpen] = useToggle(false);

  return (
    <>
      <Button variant="secondary" onClick={toggleIsOpen} endIcon={<MdDeleteForever />}>
        Стереть данные
      </Button>
      <AlertDialog
        open={isOpen}
        onOpenChange={toggleIsOpen}
        title="Стереть все данные"
        description="Вы действительно хотите сбросить прогресс и настройки?"
        cancellationText="Отменить"
        confirmationText="Стереть"
        onConfirm={resetProgress}
      />
    </>
  );
});
