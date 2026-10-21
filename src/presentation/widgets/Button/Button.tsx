import React from 'react';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'lg',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = true,
  disabled,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`edusync-button edusync-button--${variant} edusync-button--${size} ${
        fullWidth ? 'edusync-button--full-width' : ''
      } ${isLoading ? 'edusync-button--loading' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="edusync-button__spinner-wrapper">
          <svg className="edusync-button__spinner" viewBox="0 0 24 24" fill="none">
            <circle
              className="edusync-button__spinner-track"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="edusync-button__spinner-head"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="edusync-button__content">{children}</span>
        </span>
      ) : (
        <>
          {leftIcon && <span className="edusync-button__icon edusync-button__icon--left">{leftIcon}</span>}
          <span className="edusync-button__content">{children}</span>
          {rightIcon && <span className="edusync-button__icon edusync-button__icon--right">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
