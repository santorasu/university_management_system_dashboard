import React from 'react';
import { useAuthFlow } from '../../application/state/auth-flow.context';
import { Button } from '../widgets/Button/Button';
import './AuthScreens.css';

export const SessionExpiredScreen: React.FC = () => {
  const { setCurrentScreen } = useAuthFlow();

  const handleReturnToLogin = () => {
    setCurrentScreen('01_ADMIN_LOGIN');
  };

  return (
    <div className="edusync-auth-card">
      <div className="edusync-auth-card__intro">
        <div style={{ marginBottom: '8px' }}>
          <img src="/icons/clock-3.svg" alt="Clock" width={40} height={40} />
        </div>
        <h2 className="edusync-auth-card__title">Your session has expired</h2>
        <p className="edusync-auth-card__subtitle">
          For your school’s security, you’ve been signed out after a period of inactivity.
        </p>
      </div>

      <div className="edusync-session-box">
        <div className="edusync-session-box__title">Sign in again to continue your work</div>
        <div className="edusync-session-box__desc">
          Your session needs reauthentication. Any unsaved changes may not have been saved.
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
        <Button size="lg" onClick={handleReturnToLogin}>
          Sign in again
        </Button>
        <p className="edusync-auth-subtext" style={{ textAlign: 'center', fontSize: '13px' }}>
          You’ll return to the admin login to verify your identity.
        </p>
      </div>
    </div>
  );
};
