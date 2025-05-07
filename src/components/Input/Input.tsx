'use client';

import { InputHTMLAttributes, forwardRef, useState } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  type?: string;
  showPasswordToggle?: boolean;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className,
      type = 'text',
      showPasswordToggle = false,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputClass = `
      ${styles.input}
      ${error ? styles.hasError : ''}
      ${fullWidth ? styles.fullWidth : ''}
      ${className || ''}
    `;

    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
      <div className={`${styles.inputContainer} ${fullWidth ? styles.fullWidth : ''}`}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.inputWrapper}>
          <input 
            ref={ref}
            type={inputType} 
            className={inputClass} 
            {...props} 
          />
          {type === 'password' && showPasswordToggle && (
            <button
              type="button"
              className={styles.toggleButton}
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          )}
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
      </div>
    );
  }
); 