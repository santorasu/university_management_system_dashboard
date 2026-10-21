import React from 'react';
import { useAuthFlow } from '../../application/state/auth-flow.context';
import { Input } from '../widgets/Input/Input';
import { Button } from '../widgets/Button/Button';
import { StepProgress } from '../widgets/StepProgress/StepProgress';
import './AuthScreens.css';

export const ForgotPasswordScreen: React.FC = () => {
  const { email, setEmail, handleForgotPassword, setCurrentScreen, isLoading } = useAuthFlow();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleForgotPassword();
  };

  return (
    <div className="edusync-auth-card">
      <div className="edusync-auth-card__intro">
        <StepProgress currentStep={1} stepLabel="Step 1 of 3 · Request recovery" />
        <h2 className="edusync-auth-card__title">Forgot your password?</h2>
        <p className="edusync-auth-card__subtitle">
          Enter your admin email. We’ll help you securely reset your password.
        </p>
      </div>

      <form className="edusync-auth-form" onSubmit={onSubmit}>
        <Input
          label="Admin email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="office@maplegrove.edu"
          helperText="Use the email associated with your admin account."
          required
        />

        <Button type="submit" size="lg" isLoading={isLoading}>
          Send verification code
        </Button>

        <div className="edusync-auth-back-link">
          <button
            type="button"
            className="edusync-link-btn"
            onClick={() => setCurrentScreen('01_ADMIN_LOGIN')}
          >
            ← Back to admin login
          </button>
        </div>
      </form>
    </div>
  );
};
