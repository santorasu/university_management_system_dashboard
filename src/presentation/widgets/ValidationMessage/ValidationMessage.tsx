import React from 'react';
import './ValidationMessage.css';

export interface ValidationMessageProps {
  children: React.ReactNode;
  variant?: 'error' | 'success' | 'warning' | 'info';
  icon?: React.ReactNode;
  className?: string;
}

export const ValidationMessage: React.FC<ValidationMessageProps> = ({
  children,
  variant = 'info',
  icon,
  className = '',
}) => {
  const getDefaultIcon = () => {
    switch (variant) {
      case 'error':
        return <img src="/icons/circle-x.svg" alt="Error" width={16} height={16} />;
      case 'success':
        return <img src="/icons/circle-check.svg" alt="Success" width={16} height={16} />;
      case 'warning':
        return <img src="/icons/triangle-alert.svg" alt="Warning" width={16} height={16} />;
      case 'info':
        return <img src="/icons/info.svg" alt="Info" width={16} height={16} />;
    }
  };

  return (
    <div className={`edusync-validation-msg edusync-validation-msg--${variant} ${className}`}>
      <span className="edusync-validation-msg__icon">{icon || getDefaultIcon()}</span>
      <span className="edusync-validation-msg__text">{children}</span>
    </div>
  );
};
