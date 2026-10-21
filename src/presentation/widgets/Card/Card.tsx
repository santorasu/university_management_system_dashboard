import React from 'react';
import './Card.css';

export interface CardProps {
  children?: React.ReactNode;
  elevation?: 'subtle' | 'medium' | 'overlay';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevation = 'subtle',
  className = '',
}) => {
  return (
    <div className={`edusync-card edusync-card--elevation-${elevation} ${className}`}>
      {children}
    </div>
  );
};

export const SchoolContextCard: React.FC<{
  schoolName?: string;
  description?: string;
  portalNote?: string;
  className?: string;
}> = ({
  schoolName = 'Maple Grove School',
  description = 'School administration, connected.\nUse your school-issued admin account to access EduSync securely.',
  portalNote = 'Admin web portal · Authorized access only',
  className = '',
}) => {
  return (
    <div className={`edusync-school-card ${className}`}>
      <h3 className="edusync-school-card__title">{schoolName}</h3>
      <p className="edusync-school-card__desc">{description}</p>
      <div className="edusync-school-card__note">{portalNote}</div>
    </div>
  );
};
