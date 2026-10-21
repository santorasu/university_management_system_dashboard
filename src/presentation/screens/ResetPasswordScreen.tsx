import React from 'react';
import { useAuthFlow } from '../../application/state/auth-flow.context';
import { Input } from '../widgets/Input/Input';
import { Button } from '../widgets/Button/Button';
import { StepProgress } from '../widgets/StepProgress/StepProgress';
import { PasswordChecklist } from '../widgets/PasswordChecklist/PasswordChecklist';
import { PasswordValidatorService } from '../../infrastructure/services/password-validator.service';
import './AuthScreens.css';

export const ResetPasswordScreen: React.FC = () => {
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

  const criteria = PasswordValidatorService.validate(newPassword);

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
          Choose a strong password for your admin account. Don’t reuse your previous password.
        </p>
      </div>

      <form className="edusync-auth-form" onSubmit={onSubmit}>
        <Input
          label="New password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          isPassword
          isPasswordVisible={isPasswordVisible}
          onTogglePasswordVisibility={togglePasswordVisibility}
          helperText="At least 8 characters, with uppercase, lowercase and a number."
          required
        />

        <Input
          label="Confirm new password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          isPassword
          isPasswordVisible={isPasswordVisible}
          onTogglePasswordVisibility={togglePasswordVisibility}
          helperText="Enter the same password again."
          required
        />

        <PasswordChecklist
          hasMinLength={criteria.hasMinLength}
          hasUppercase={criteria.hasUppercase}
          hasNumberOrSymbol={criteria.hasNumber || criteria.hasSymbol}
        />

        <Button type="submit" size="lg" isLoading={isLoading} disabled={!newPassword || !confirmPassword}>
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
