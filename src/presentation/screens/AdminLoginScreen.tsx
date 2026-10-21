import React from 'react';
import { useAuthFlow } from '../../application/state/auth-flow.context';
import { Input } from '../widgets/Input/Input';
import { Button } from '../widgets/Button/Button';
import { Checkbox } from '../widgets/Checkbox/Checkbox';
import './AuthScreens.css';

export const AdminLoginScreen: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    isPasswordVisible,
    togglePasswordVisibility,
    handleLogin,
    setCurrentScreen,
    isLoading,
  } = useAuthFlow();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="edusync-auth-card">
      <div className="edusync-auth-card__intro">
        <h2 className="edusync-auth-card__title">Welcome back</h2>
        <p className="edusync-auth-card__subtitle">
          Sign in to your EduSync admin account.
        </p>
      </div>

      <form className="edusync-auth-form" onSubmit={onSubmit}>
        <Input
          label="Admin email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="office@maplegrove.edu"
          helperText="Use your school administrator email."
          required
        />

        <div className="edusync-form-group-with-link">
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            isPassword
            isPasswordVisible={isPasswordVisible}
            onTogglePasswordVisibility={togglePasswordVisibility}
            helperText="Your password is case-sensitive."
            required
          />
          <div className="edusync-recovery-action">
            <button
              type="button"
              className="edusync-link-btn"
              onClick={() => setCurrentScreen('02_FORGOT_PASSWORD')}
            >
              Forgot password?
            </button>
          </div>
        </div>

        <Checkbox
          label="Remember me"
          checked={rememberMe}
          onChange={setRememberMe}
        />

        <Button type="submit" size="lg" isLoading={isLoading}>
          Sign in
        </Button>
      </form>
    </div>
  );
};
