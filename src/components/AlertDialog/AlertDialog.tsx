import { AlertDialog as BaseUiAlertDialog } from '@base-ui/react/alert-dialog';

import styles from './AlertDialog.module.css';

type Props = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  title: string;
  description: string;
  cancellationText: string;
  confirmationText: string;
  onConfirm: () => void;
};

export const AlertDialog = ({
  open,
  onOpenChange,
  title,
  description,
  cancellationText,
  confirmationText,
  onConfirm,
}: Props) => {
  return (
    <BaseUiAlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseUiAlertDialog.Portal>
        <BaseUiAlertDialog.Backdrop className={styles.backdrop} />
        <BaseUiAlertDialog.Popup className={styles.popup}>
          <BaseUiAlertDialog.Title className={styles.title}>{title}</BaseUiAlertDialog.Title>
          <BaseUiAlertDialog.Description className={styles.description}>
            {description}
          </BaseUiAlertDialog.Description>
          <div className={styles.actions}>
            <BaseUiAlertDialog.Close className={styles.button}>
              {cancellationText}
            </BaseUiAlertDialog.Close>
            <BaseUiAlertDialog.Close data-color="red" className={styles.button} onClick={onConfirm}>
              {confirmationText}
            </BaseUiAlertDialog.Close>
          </div>
        </BaseUiAlertDialog.Popup>
      </BaseUiAlertDialog.Portal>
    </BaseUiAlertDialog.Root>
  );
};
