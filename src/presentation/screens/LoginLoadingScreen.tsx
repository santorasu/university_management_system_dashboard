import React from 'react';
import { useAuthFlow } from '../../application/state/auth-flow.context';
import { Input } from '../widgets/Input/Input';
import { Button } from '../widgets/Button/Button';
import { Checkbox } from '../widgets/Checkbox/Checkbox';
import { ValidationMessage } from '../widgets/ValidationMessage/ValidationMessage';
import './AuthScreens.css';

export const LoginLoadingScreen: React.FC = () => {
  const { email, password, rememberMe, setCurrentScreen } = useAuthFlow();

  return (
    <div className="edusync-auth-card">
      <div className="edusync-auth-card__intro">
        <h2 className="edusync-auth-card__title">Welcome back</h2>
        <p className="edusync-auth-card__subtitle">
          Sign in to your EduSync admin account.
        </p>
      </div>

      <div className="edusync-auth-form">
        <Input
          label="Admin email"
          type="email"
          value={email}
          disabled
          helperText="Use your school administrator email."
        />

        <div className="edusync-form-group-with-link">
          <Input
            label="Password"
            type="password"
            value={password}
            disabled
            helperText="Your password is case-sensitive."
          />
          <div className="edusync-recovery-action">
            <button
              type="button"
              className="edusync-link-btn"
              disabled
              style={{ opacity: 0.5, cursor: 'not-allowed' }}
            >
              Forgot password?
            </button>
          </div>
        </div>

        <Checkbox
          label="Remember me"
          checked={rememberMe}
          onChange={() => {}}
          disabled
        />

        <Button size="lg" isLoading={true}>
          Signing in…
        </Button>

        <ValidationMessage variant="info">
          Checking your credentials. Please wait; controls are temporarily disabled.
        </ValidationMessage>

        <div className="edusync-auth-back-link">
          <button
            type="button"
            className="edusync-link-btn"
            onClick={() => setCurrentScreen('01_ADMIN_LOGIN')}
          >
            Cancel and return
          </button>
        </div>
      </div>
    </div>
  );
};
