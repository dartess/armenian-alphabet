import { useEffect } from 'react';
import { useToggle } from 'react-use';

import { Button } from '@/components/Button/Button';
import { Dialog } from '@/components/Dialog/Dialog';
import { reachGoal } from '@/utils/reachGoal';
import { LinkExternal } from '@/components/LinkExternal';

export function AboutDonate() {
  const [isOpen, toggleIsOpen] = useToggle(false);

  useEffect(() => {
    if (isOpen) {
      reachGoal('openDonate');
    }
  }, [isOpen]);

  return (
    <div>
      <Button variant="secondary" onClick={toggleIsOpen}>
        «Спасибо»
      </Button>
      <Dialog
        open={isOpen}
        onOpenChange={toggleIsOpen}
        title="Сказать «Спасибо»"
        actions={<Button onClick={toggleIsOpen}>Закрыть</Button>}
      >
        <p>Если это приложение вам помогло, я очень этому рад!</p>
        <p>
          При желании вы можете отблагодарить автора шоколадкой 🍫 или помочь оплатить домен 🌐.
        </p>
        <LinkExternal href="https://boosty.to/aybuben">Boosty</LinkExternal>
      </Dialog>
    </div>
  );
}
