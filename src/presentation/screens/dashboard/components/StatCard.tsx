import React from 'react';

export interface StatCardProps {
  label: string;
  value: string;
  subtext?: string;
  trend?: string;
  isPositive?: boolean;
  className?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  trend,
  isPositive,
  className = '',
  onClick,
}) => {
  return (
    <div
      className={`edusync-stat-card ${onClick ? 'edusync-stat-card--clickable' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="edusync-stat-card__label">{label}</div>
      <div className="edusync-stat-card__value">{value}</div>
      {(subtext || trend) && (
        <div className="edusync-stat-card__footer">
          {trend && (
            <span
              className={`edusync-stat-card__trend ${
                isPositive ? 'edusync-stat-card__trend--positive' : ''
              }`}
            >
              {trend}
            </span>
          )}
          {subtext && <span className="edusync-stat-card__subtext">{subtext}</span>}
        </div>
      )}
    </div>
  );
};
