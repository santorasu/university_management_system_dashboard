import React from 'react';
import { useAuthFlow } from '../../application/state/auth-flow.context';
import { OTPInput } from '../widgets/OTPInput/OTPInput';
import { Button } from '../widgets/Button/Button';
import { StepProgress } from '../widgets/StepProgress/StepProgress';
import { ValidationMessage } from '../widgets/ValidationMessage/ValidationMessage';
import './AuthScreens.css';

export const OTPInvalidCodeScreen: React.FC = () => {
  const {
    email,
    otp,
    setOtp,
    handleVerifyOtp,
    handleResendOtp,
    setCurrentScreen,
    isLoading,
  } = useAuthFlow();

  const onTryAgain = () => {
    handleVerifyOtp();
  };

  return (
    <div className="edusync-auth-card">
      <div className="edusync-auth-card__intro">
        <StepProgress currentStep={2} stepLabel="Step 2 of 3 · Verification code" />
        <h2 className="edusync-auth-card__title">Check your email</h2>
        <p className="edusync-auth-card__subtitle">
          Enter the verification code sent to <strong>{email}</strong> to continue.
        </p>
      </div>

      <div className="edusync-auth-form">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label className="edusync-input-group__label">6-digit verification code</label>
          <OTPInput value={otp || '248160'} onChange={setOtp} hasError />
        </div>

        <ValidationMessage variant="error">
          That code is incorrect. Check the email and try again.
        </ValidationMessage>

        <Button size="lg" isLoading={isLoading} onClick={onTryAgain}>
          Try again
        </Button>

        <div className="edusync-auth-actions-row">
          <span className="edusync-auth-subtext" style={{ fontSize: '13px' }}>
            You can request a new code now.{' '}
            <button
              type="button"
              className="edusync-link-btn"
              onClick={handleResendOtp}
            >
              Resend code
            </button>
          </span>

          <button
            type="button"
            className="edusync-link-btn"
            onClick={() => setCurrentScreen('02_FORGOT_PASSWORD')}
          >
            Use a different email
          </button>
        </div>
      </div>
    </div>
  );
};
