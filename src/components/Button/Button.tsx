'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  fullWidth = false,
  isLoading = false,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${className || ''}`;

  return (
    <button
      className={buttonClass}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <span className={styles.loader}></span> : children}
    </button>
  );
}; 