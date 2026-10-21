import React, { forwardRef } from 'react';
import './Input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  hasError?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
  isPasswordVisible?: boolean;
  onTogglePasswordVisibility?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      hasError = false,
      leftIcon,
      rightIcon,
      isPassword = false,
      isPasswordVisible = false,
      onTogglePasswordVisibility,
      disabled,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    const isError = hasError || !!errorMessage;

    return (
      <div className={`edusync-input-group ${isError ? 'edusync-input-group--error' : ''} ${className}`}>
        {label && (
          <label htmlFor={inputId} className="edusync-input-group__label">
            {label}
          </label>
        )}
        <div className={`edusync-input-wrapper ${disabled ? 'edusync-input-wrapper--disabled' : ''}`}>
          {leftIcon && <span className="edusync-input__icon edusync-input__icon--left">{leftIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            type={isPassword ? (isPasswordVisible ? 'text' : 'password') : props.type || 'text'}
            className="edusync-input"
            {...props}
          />
          {isPassword && onTogglePasswordVisibility && (
            <button
              type="button"
              className="edusync-input__eye-btn"
              onClick={onTogglePasswordVisibility}
              aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              <img
                src={isPasswordVisible ? '/icons/eye-off.svg' : '/icons/eye.svg'}
                alt={isPasswordVisible ? 'Hide password' : 'Show password'}
                width={16}
                height={16}
              />
            </button>
          )}
          {!isPassword && rightIcon && (
            <span className="edusync-input__icon edusync-input__icon--right">{rightIcon}</span>
          )}
          {isError && (
            <span className="edusync-input__status-icon">
              <img src="/icons/circle-x.svg" alt="Error" width={16} height={16} />
            </span>
          )}
        </div>
        {(errorMessage || helperText) && (
          <p className={`edusync-input-group__helper ${isError ? 'edusync-input-group__helper--error' : ''}`}>
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
