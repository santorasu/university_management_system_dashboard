import React from 'react';
import './Radio.css';

export interface RadioProps {
  id?: string;
  name?: string;
  label?: React.ReactNode;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  className?: string;
}

export const Radio: React.FC<RadioProps> = ({
  id,
  name,
  label,
  checked,
  onChange,
  disabled = false,
  className = '',
}) => {
  const radioId = id || (typeof label === 'string' ? `radio-${label.toLowerCase().replace(/\s+/g, '-')}` : 'edusync-radio');

  return (
    <label
      htmlFor={radioId}
      className={`edusync-radio-label ${disabled ? 'edusync-radio-label--disabled' : ''} ${className}`}
    >
      <div className={`edusync-radio ${checked ? 'edusync-radio--checked' : ''}`}>
        <input
          id={radioId}
          type="radio"
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="edusync-radio__native"
        />
        {checked && <div className="edusync-radio__inner-dot" />}
      </div>
      {label && <span className="edusync-radio__text">{label}</span>}
    </label>
  );
};
