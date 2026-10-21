import React from 'react';

export type IconName =
  | 'edusync-symbol'
  | 'school'
  | 'lock-keyhole'
  | 'info'
  | 'clock-3'
  | 'mail-check'
  | 'circle-check'
  | 'circle-alert'
  | 'triangle-alert'
  | 'circle-x'
  | 'eye'
  | 'eye-off'
  | 'check'
  | 'minus'
  | 'chevron-down'
  | 'chevron-right'
  | 'search'
  | 'bell'
  | 'layout-dashboard'
  | 'graduation-cap'
  | 'book-open'
  | 'settings'
  | 'user-check'
  | 'calendar-days'
  | 'notebook-pen'
  | 'clipboard-check'
  | 'wallet'
  | 'messages-square'
  | 'folder-open'
  | 'calendar-check'
  | 'chart-no-axes-combined'
  | 'users'
  | 'user-cog';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 16, className = '', color }) => {
  return (
    <img
      src={`/icons/${name}.svg`}
      alt={name}
      width={size}
      height={size}
      className={`edusync-icon ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-block',
        verticalAlign: 'middle',
        ...(color ? { filter: `drop-shadow(0 0 0 ${color})` } : {}),
      }}
    />
  );
};
