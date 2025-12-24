import type {ReactNode, MouseEventHandler} from "react";
import cn from "classnames";

import styles from './Button.module.css';

type PropsContent = {
  children: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
} | {
  icon: ReactNode;
}

type Props = PropsContent & {
  className?: string;
  onClick?: MouseEventHandler;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  status?: 'default' | 'success' | 'error';
}

export const Button = (props: Props) => {
  const {className, onClick, variant = 'primary', disabled, status = 'default'} = props;
  const onlyIcon = 'icon' in props;
  return (
    <button
      type="button"
      className={cn(
        className,
        styles.root,
        variant === 'primary' && styles.variantPrimary,
        variant === 'secondary' && styles.variantSecondary,
        status === 'default' && styles.statusDefault,
        status === 'error' && styles.statusError,
        status === 'success' && styles.statusSuccess,
        onlyIcon && styles.onlyIcon,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {'icon' in props
        ? props.icon
        : (
          <>
            {props.startIcon && <span className={styles.icon}>{props.startIcon}</span>}
            <span className={styles.text}>{props.children}</span>
            {props.endIcon && <span className={styles.icon}>{props.endIcon}</span>}
          </>
      )}
    </button>
  )
}
