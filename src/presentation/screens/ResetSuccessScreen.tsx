import React from 'react';
import { useAuthFlow } from '../../application/state/auth-flow.context';
import { Button } from '../widgets/Button/Button';
import { StepProgress } from '../widgets/StepProgress/StepProgress';
import { ValidationMessage } from '../widgets/ValidationMessage/ValidationMessage';
import './AuthScreens.css';

export const ResetSuccessScreen: React.FC = () => {
  const { setCurrentScreen } = useAuthFlow();

  const handleBackToLogin = () => {
    setCurrentScreen('01_ADMIN_LOGIN');
  };

  return (
    <div className="edusync-auth-card">
      <div className="edusync-auth-card__intro">
        <StepProgress currentStep={3} stepLabel="Step 3 of 3 · Password recovered" />
        <div style={{ marginTop: '8px' }}>
          <img src="/icons/circle-check.svg" alt="Success" width={36} height={36} />
        </div>
        <h2 className="edusync-auth-card__title">Password reset complete</h2>
        <p className="edusync-auth-card__subtitle">
          Your admin password has been updated. You can now sign in with your new password.
        </p>
      </div>

      <div className="edusync-auth-form">
        <ValidationMessage variant="success">
          Your new password is ready to use.
        </ValidationMessage>

        <p className="edusync-auth-subtext">
          For your security, sign in again to start a new admin session.
        </p>

        <Button size="lg" onClick={handleBackToLogin}>
          Back to admin login
        </Button>
      </div>
    </div>
  );
};
