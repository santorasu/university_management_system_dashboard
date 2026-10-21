import React from 'react';
import './StepProgress.css';

export interface StepProgressProps {
  currentStep: 1 | 2 | 3;
  stepLabel: string;
  className?: string;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  stepLabel,
  className = '',
}) => {
  return (
    <div className={`edusync-step-progress ${className}`}>
      <div className="edusync-step-progress__bars">
        <div
          className={`edusync-step-progress__bar ${
            currentStep >= 1 ? 'edusync-step-progress__bar--active' : ''
          }`}
        />
        <div
          className={`edusync-step-progress__bar ${
            currentStep >= 2 ? 'edusync-step-progress__bar--active' : ''
          }`}
        />
        <div
          className={`edusync-step-progress__bar ${
            currentStep >= 3 ? 'edusync-step-progress__bar--active' : ''
          }`}
        />
      </div>
      <span className="edusync-step-progress__label">{stepLabel}</span>
    </div>
  );
};
