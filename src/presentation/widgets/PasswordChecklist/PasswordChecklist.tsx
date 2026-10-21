import React from 'react';
import './PasswordChecklist.css';

export interface PasswordChecklistProps {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasNumberOrSymbol: boolean;
  showErrors?: boolean;
  className?: string;
}

export const PasswordChecklist: React.FC<PasswordChecklistProps> = ({
  hasMinLength,
  hasUppercase,
  hasNumberOrSymbol,
  showErrors = false,
  className = '',
}) => {
  const renderItem = (label: string, isMet: boolean) => {
    let iconClass = 'edusync-checklist-item__icon--pending';
    let iconSrc = '/icons/minus.svg';

    if (isMet) {
      iconClass = 'edusync-checklist-item__icon--met';
      iconSrc = '/icons/circle-check.svg';
    } else if (showErrors) {
      iconClass = 'edusync-checklist-item__icon--unmet';
      iconSrc = '/icons/circle-x.svg';
    }

    return (
      <li className={`edusync-checklist-item ${isMet ? 'edusync-checklist-item--met' : ''}`}>
        <span className={`edusync-checklist-item__icon ${iconClass}`}>
          <img src={iconSrc} alt={isMet ? 'Satisfied' : 'Pending'} width={14} height={14} />
        </span>
        <span className="edusync-checklist-item__label">{label}</span>
      </li>
    );
  };

  return (
    <div className={`edusync-password-checklist ${className}`}>
      <div className="edusync-password-checklist__title">Password requirements:</div>
      <ul className="edusync-password-checklist__list">
        {renderItem('At least 8 characters', hasMinLength)}
        {renderItem('Includes uppercase and lowercase letters', hasUppercase)}
        {renderItem('Includes at least one number or symbol', hasNumberOrSymbol)}
      </ul>
    </div>
  );
};
