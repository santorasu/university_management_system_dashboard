import React from 'react';
import './Checkbox.css';

export interface CheckboxProps {
  id?: string;
  label?: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  disabled = false,
  className = '',
}) => {
  const checkboxId = id || (typeof label === 'string' ? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}` : 'edusync-checkbox');

  return (
    <label
      htmlFor={checkboxId}
      className={`edusync-checkbox-label ${disabled ? 'edusync-checkbox-label--disabled' : ''} ${className}`}
    >
      <div className={`edusync-checkbox ${checked ? 'edusync-checkbox--checked' : ''}`}>
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="edusync-checkbox__native"
        />
        {checked && (
          <svg className="edusync-checkbox__check" viewBox="0 0 14 14" fill="none">
            <path
              d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      {label && <span className="edusync-checkbox__text">{label}</span>}
    </label>
  );
};
