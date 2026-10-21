import React from 'react';
import { useAuthFlow } from '../../application/state/auth-flow.context';
import { Button } from '../widgets/Button/Button';
import { StepProgress } from '../widgets/StepProgress/StepProgress';
import { ValidationMessage } from '../widgets/ValidationMessage/ValidationMessage';
import './AuthScreens.css';

export const EmailSentScreen: React.FC = () => {
  const { setCurrentScreen, handleResendOtp, resendSeconds } = useAuthFlow();

  const formattedSeconds = String(resendSeconds).padStart(2, '0');

  return (
    <div className="edusync-auth-card">
      <div className="edusync-auth-card__intro">
        <StepProgress currentStep={1} stepLabel="Step 1 of 3 · Recovery sent" />
        <h2 className="edusync-auth-card__title">Check your inbox</h2>
        <p className="edusync-auth-card__subtitle">
          If an admin account is associated with that email, we’ve sent a 6-digit verification code.
        </p>
      </div>

      <div className="edusync-auth-form">
        <ValidationMessage variant="success">
          Recovery request received.
        </ValidationMessage>

        <p className="edusync-auth-subtext">
          Check your inbox and spam folder. The code is valid for 10 minutes. Continue when it arrives.
        </p>

        <Button size="lg" onClick={() => setCurrentScreen('03_OTP_VERIFICATION')}>
          Enter verification code
        </Button>

        <div className="edusync-auth-actions-row">
          <span className="edusync-auth-subtext" style={{ fontSize: '13px' }}>
            {resendSeconds > 0 ? (
              `Resend available in 00:${formattedSeconds}`
            ) : (
              <button
                type="button"
                className="edusync-link-btn"
                onClick={handleResendOtp}
              >
                Resend email
              </button>
            )}
          </span>

          <button
            type="button"
            className="edusync-link-btn"
            onClick={() => setCurrentScreen('01_ADMIN_LOGIN')}
          >
            ← Back to admin login
          </button>
        </div>
      </div>
    </div>
  );
};
