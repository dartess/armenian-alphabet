import { useEffect } from 'react';
import Link from '@mui/material/Link';
import { useToggle } from 'react-use';

import { Button } from '@/components/Button/Button';
import { Dialog } from '@/components/Dialog/Dialog';
import { reachGoal } from '@/utils/reachGoal';

export function AboutContacts() {
  const [isOpen, toggleIsOpen] = useToggle(false);

  useEffect(() => {
    if (isOpen) {
      reachGoal('openContacts');
    }
  }, [isOpen]);

  return (
    <div>
      <Button variant="secondary" onClick={toggleIsOpen}>
        Контакты
      </Button>
      <Dialog
        open={isOpen}
        onOpenChange={toggleIsOpen}
        title="Контакты"
        actions={<Button onClick={toggleIsOpen}>Закрыть</Button>}
      >
        <p>
          Если у вас есть обратная связь по приложению, вы можете написать мне на почту{' '}
          <Link href="mailto:aybuben.app@mail.ru?subject=Aybuben%20app">aybuben.app@mail.ru</Link>.
        </p>
        <p>
          Также вы можете мне написать, если вы являетесь дизайнером и хотите поучаствовать в
          развитии приложения.
        </p>
      </Dialog>
    </div>
  );
}
