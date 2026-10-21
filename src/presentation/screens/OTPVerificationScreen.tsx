import React from 'react';
import { useAuthFlow } from '../../application/state/auth-flow.context';
import { OTPInput } from '../widgets/OTPInput/OTPInput';
import { Button } from '../widgets/Button/Button';
import { StepProgress } from '../widgets/StepProgress/StepProgress';
import { ValidationMessage } from '../widgets/ValidationMessage/ValidationMessage';
import './AuthScreens.css';

export const OTPVerificationScreen: React.FC = () => {
  const {
    email,
    otp,
    setOtp,
    handleVerifyOtp,
    handleResendOtp,
    resendSeconds,
    setCurrentScreen,
    isLoading,
  } = useAuthFlow();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleVerifyOtp();
  };

  const formattedSeconds = String(resendSeconds).padStart(2, '0');

  return (
    <div className="edusync-auth-card">
      <div className="edusync-auth-card__intro">
        <StepProgress currentStep={2} stepLabel="Step 2 of 3 · Verification code" />
        <h2 className="edusync-auth-card__title">Check your email</h2>
        <p className="edusync-auth-card__subtitle">
          Enter the verification code sent to <strong>{email}</strong> to continue.
        </p>
      </div>

      <form className="edusync-auth-form" onSubmit={onSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label className="edusync-input-group__label">6-digit verification code</label>
          <OTPInput value={otp} onChange={setOtp} />
        </div>

        <ValidationMessage variant="info">
          Enter the code from your recovery email. It expires in 10 minutes.
        </ValidationMessage>

        <Button type="submit" size="lg" isLoading={isLoading} disabled={otp.length < 6}>
          Verify code
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
                Resend code
              </button>
            )}
          </span>

          <button
            type="button"
            className="edusync-link-btn"
            onClick={() => setCurrentScreen('02_FORGOT_PASSWORD')}
          >
            Use a different email
          </button>
        </div>
      </form>
    </div>
  );
};
