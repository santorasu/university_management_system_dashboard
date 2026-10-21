import React from 'react';
import { useAuthFlow } from '../../application/state/auth-flow.context';
import { Input } from '../widgets/Input/Input';
import { Button } from '../widgets/Button/Button';
import { StepProgress } from '../widgets/StepProgress/StepProgress';
import { PasswordChecklist } from '../widgets/PasswordChecklist/PasswordChecklist';
import './AuthScreens.css';

export const ResetValidationErrorScreen: React.FC = () => {
  const {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleResetPassword,
    setCurrentScreen,
    isLoading,
    isPasswordVisible,
    togglePasswordVisibility,
  } = useAuthFlow();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleResetPassword();
  };

  return (
    <div className="edusync-auth-card">
      <div className="edusync-auth-card__intro">
        <StepProgress currentStep={3} stepLabel="Step 3 of 3 · Reset password" />
        <h2 className="edusync-auth-card__title">Set a new password</h2>
        <p className="edusync-auth-card__subtitle">
          Check the two fields below, then try again. Your entries have been kept.
        </p>
      </div>

      <form className="edusync-auth-form" onSubmit={onSubmit}>
        <Input
          label="New password"
          type="text"
          value={newPassword || 'maple'}
          onChange={(e) => setNewPassword(e.target.value)}
          hasError
          isPassword
          isPasswordVisible={isPasswordVisible}
          onTogglePasswordVisibility={togglePasswordVisibility}
          errorMessage="Use at least 8 characters, with uppercase and a number."
        />

        <Input
          label="Confirm new password"
          type="text"
          value={confirmPassword || 'maples'}
          onChange={(e) => setConfirmPassword(e.target.value)}
          hasError
          isPassword
          isPasswordVisible={isPasswordVisible}
          onTogglePasswordVisibility={togglePasswordVisibility}
          errorMessage="Passwords do not match. Re-enter your new password."
        />

        <PasswordChecklist
          hasMinLength={false}
          hasUppercase={false}
          hasNumberOrSymbol={false}
          showErrors
        />

        <Button type="submit" size="lg" isLoading={isLoading}>
          Reset password
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
