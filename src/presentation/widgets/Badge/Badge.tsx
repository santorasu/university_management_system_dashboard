import React from 'react';
import './Badge.css';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error' | 'neutral';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'info',
  icon,
  className = '',
}) => {
  return (
    <span className={`edusync-badge edusync-badge--${variant} ${className}`}>
      {icon && <span className="edusync-badge__icon">{icon}</span>}
      <span className="edusync-badge__text">{children}</span>
    </span>
  );
};
