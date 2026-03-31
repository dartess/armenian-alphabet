import { observer } from 'mobx-react-lite';
import { MdDeleteForever } from 'react-icons/md';

import { Button } from '@/components/Button/Button';
import { useStore } from '@/core/stores';
import { AlertDialog } from '@/components/AlertDialog/AlertDialog';
import { useToggle } from '@/utils/useToggle';

export const ResetButton = observer(function ResetButton() {
  const { resetProgress } = useStore('progress');
  const [isOpen, toggleIsOpenRaw] = useToggle(false);
  const toggleIsOpen = () => {
    toggleIsOpenRaw();
  };

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
