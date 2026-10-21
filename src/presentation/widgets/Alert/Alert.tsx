import React from 'react';
import './Alert.css';

export interface AlertProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'error' | 'warning' | 'success' | 'info';
  icon?: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  title,
  children,
  variant = 'error',
  icon,
  className = '',
}) => {
  const getDefaultIcon = () => {
    switch (variant) {
      case 'error':
        return <img src="/icons/triangle-alert.svg" alt="Error" width={18} height={18} />;
      case 'warning':
        return <img src="/icons/triangle-alert.svg" alt="Warning" width={18} height={18} />;
      case 'success':
        return <img src="/icons/circle-check.svg" alt="Success" width={18} height={18} />;
      case 'info':
        return <img src="/icons/info.svg" alt="Info" width={18} height={18} />;
    }
  };

  return (
    <div className={`edusync-alert edusync-alert--${variant} ${className}`} role="alert">
      <div className="edusync-alert__icon-wrapper">
        {icon || getDefaultIcon()}
      </div>
      <div className="edusync-alert__body">
        {title && <h4 className="edusync-alert__title">{title}</h4>}
        <div className="edusync-alert__content">{children}</div>
      </div>
    </div>
  );
};
