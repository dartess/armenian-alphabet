import { Button } from '@/components/Button/Button';
import { LinkExternal } from '@/components/LinkExternal';
import { Dialog } from '@/components/Dialog/Dialog';
import { Link } from '@/components/Link/Link';
import { useToggle } from '@/utils/useToggle';

export function AboutLicense() {
  const [isOpen, toggleIsOpenRaw] = useToggle(false);
  const toggleIsOpen = () => {
    toggleIsOpenRaw();
  };

  return (
    <div>
      <Link onClick={toggleIsOpen} color="secondary">
        Лицензии
      </Link>
      <Dialog
        open={isOpen}
        onOpenChange={toggleIsOpen}
        title="Использованные материалы"
        actions={<Button onClick={toggleIsOpen}>Закрыть</Button>}
      >
        <p>
          Озвучка использована по лицензии CC BY 3.0. Автор:{' '}
          <LinkExternal href="https://commons.wikimedia.org/wiki/User:Vahagn_Petrosyan">
            Vahagn Petrosyan
          </LinkExternal>
        </p>
        <p>
          Изображения сгенерированы в{' '}
          <LinkExternal href="https://dream.ai/">Dream by WOMBO</LinkExternal>
        </p>
      </Dialog>
    </div>
  );
}
