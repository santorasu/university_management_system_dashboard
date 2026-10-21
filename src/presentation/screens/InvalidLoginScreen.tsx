import React from 'react';
import { useAuthFlow } from '../../application/state/auth-flow.context';
import { Input } from '../widgets/Input/Input';
import { Button } from '../widgets/Button/Button';
import { Checkbox } from '../widgets/Checkbox/Checkbox';
import { Alert } from '../widgets/Alert/Alert';
import './AuthScreens.css';

export const InvalidLoginScreen: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
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

      <Alert title="Unable to sign in" variant="error">
        Email or password is incorrect. Check your details and try again.
      </Alert>

      <form className="edusync-auth-form" onSubmit={onSubmit}>
        <Input
          label="Admin email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="office@maplegrove.edu"
          hasError
          helperText="Use your school administrator email."
        />

        <div className="edusync-form-group-with-link">
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            hasError
            helperText="Your password is case-sensitive."
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
