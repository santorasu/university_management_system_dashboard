import React, { useState } from 'react';
import { AuthFlowProvider, useAuthFlow } from './application/state/auth-flow.context';
import { AuthSplitLayout } from './presentation/layouts/AuthSplitLayout';
import { AdminLoginScreen } from './presentation/screens/AdminLoginScreen';
import { ForgotPasswordScreen } from './presentation/screens/ForgotPasswordScreen';
import { OTPVerificationScreen } from './presentation/screens/OTPVerificationScreen';
import { ResetPasswordScreen } from './presentation/screens/ResetPasswordScreen';
import { InvalidLoginScreen } from './presentation/screens/InvalidLoginScreen';
import { SessionExpiredScreen } from './presentation/screens/SessionExpiredScreen';
import { LoginLoadingScreen } from './presentation/screens/LoginLoadingScreen';
import { PasswordVisibleScreen } from './presentation/screens/PasswordVisibleScreen';
import { EmailSentScreen } from './presentation/screens/EmailSentScreen';
import { OTPInvalidCodeScreen } from './presentation/screens/OTPInvalidCodeScreen';
import { ResetValidationErrorScreen } from './presentation/screens/ResetValidationErrorScreen';
import { ResetSuccessScreen } from './presentation/screens/ResetSuccessScreen';
import { DashboardScreen } from './presentation/screens/DashboardScreen';
import { DesignSystemSpecimen } from './presentation/specimens/DesignSystemSpecimen';
import { FloatingFlowInspector } from './presentation/components/FloatingFlowInspector';
import './App.css';

const MainFlowView: React.FC = () => {
  const { currentScreen } = useAuthFlow();

  if (currentScreen === 'DASHBOARD') {
    return <DashboardScreen />;
  }

  const renderAuthScreen = () => {
    switch (currentScreen) {
      case '01_ADMIN_LOGIN':
        return <AdminLoginScreen />;
      case '02_FORGOT_PASSWORD':
        return <ForgotPasswordScreen />;
      case '03_OTP_VERIFICATION':
        return <OTPVerificationScreen />;
      case '04_RESET_PASSWORD':
        return <ResetPasswordScreen />;
      case '05_INVALID_LOGIN':
        return <InvalidLoginScreen />;
      case '06_SESSION_EXPIRED':
        return <SessionExpiredScreen />;
      case '07_LOGIN_LOADING':
        return <LoginLoadingScreen />;
      case '08_LOGIN_PASSWORD_VISIBLE':
        return <PasswordVisibleScreen />;
      case '09_EMAIL_SENT':
        return <EmailSentScreen />;
      case '10_OTP_INVALID_CODE':
        return <OTPInvalidCodeScreen />;
      case '11_RESET_VALIDATION_ERROR':
        return <ResetValidationErrorScreen />;
      case '12_RESET_SUCCESS':
        return <ResetSuccessScreen />;
      default:
        return <AdminLoginScreen />;
    }
  };

  return <AuthSplitLayout>{renderAuthScreen()}</AuthSplitLayout>;
};

export function App() {
  const [viewMode, setViewMode] = useState<'auth' | 'specimen'>('auth');

  return (
    <AuthFlowProvider>
      <div className="edusync-app-root">
        {/* PURE FIGMA CONTENT */}
        {viewMode === 'auth' ? <MainFlowView /> : <DesignSystemSpecimen />}

        {/* NON-INTRUSIVE FLOATING INSPECTOR */}
        <FloatingFlowInspector viewMode={viewMode} setViewMode={setViewMode} />
      </div>
    </AuthFlowProvider>
  );
}

export default App;
