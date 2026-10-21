import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthScreenId, AuthSession } from '../../core/entities/auth.types';
import { defaultAuthRepository } from '../../infrastructure/repositories/mock-auth.repository';

interface AuthFlowContextValue {
  currentScreen: AuthScreenId;
  setCurrentScreen: (screen: AuthScreenId) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  rememberMe: boolean;
  setRememberMe: (val: boolean) => void;
  otp: string;
  setOtp: (otp: string) => void;
  newPassword: string;
  setNewPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  isLoading: boolean;
  isPasswordVisible: boolean;
  togglePasswordVisibility: () => void;
  errorMessage: string | null;
  setErrorMessage: (msg: string | null) => void;
  session: AuthSession | null;
  resendSeconds: number;

  // Actions
  handleLogin: () => Promise<void>;
  handleForgotPassword: () => Promise<void>;
  handleVerifyOtp: () => Promise<void>;
  handleResetPassword: () => Promise<void>;
  handleResendOtp: () => Promise<void>;
  handleSignOut: () => Promise<void>;
  quickNavigateToFigmaScreen: (screenId: AuthScreenId) => void;
}

const AuthFlowContext = createContext<AuthFlowContextValue | undefined>(undefined);

export const AuthFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<AuthScreenId>('01_ADMIN_LOGIN');
  const [email, setEmail] = useState('office@maplegrove.edu');
  const [password, setPassword] = useState('MapleDemo24!');
  const [rememberMe, setRememberMe] = useState(true);
  const [otp, setOtp] = useState('248160');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [resendSeconds, setResendSeconds] = useState(48);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (resendSeconds > 0 && (currentScreen === '03_OTP_VERIFICATION' || currentScreen === '10_OTP_INVALID_CODE')) {
      timer = setTimeout(() => setResendSeconds((s) => s - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendSeconds, currentScreen]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setCurrentScreen('07_LOGIN_LOADING');
    try {
      const sess = await defaultAuthRepository.login({ email, password, rememberMe });
      setSession(sess);
      setIsLoading(false);
      // Success: naturally transition to the authenticated Admin Dashboard!
      setCurrentScreen('DASHBOARD');
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Unable to sign in. Email or password is incorrect.');
      setCurrentScreen('05_INVALID_LOGIN');
    }
  };

  const handleForgotPassword = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await defaultAuthRepository.requestPasswordReset(email);
      setIsLoading(false);
      setCurrentScreen('09_EMAIL_SENT');
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message);
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await defaultAuthRepository.verifyOTP(email, otp);
      setIsLoading(false);
      setCurrentScreen('04_RESET_PASSWORD');
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message);
      setCurrentScreen('10_OTP_INVALID_CODE');
    }
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await defaultAuthRepository.resetPassword({
        email,
        code: otp,
        newPassword,
        confirmPassword,
      });
      setIsLoading(false);
      setCurrentScreen('12_RESET_SUCCESS');
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message);
      setCurrentScreen('11_RESET_VALIDATION_ERROR');
    }
  };

  const handleResendOtp = async () => {
    setResendSeconds(60);
    await defaultAuthRepository.requestPasswordReset(email);
  };

  const handleSignOut = async () => {
    await defaultAuthRepository.logout();
    setSession(null);
    setCurrentScreen('01_ADMIN_LOGIN');
  };

  const quickNavigateToFigmaScreen = (screenId: AuthScreenId) => {
    setCurrentScreen(screenId);
    // Initialize standard mock values according to Figma specs
    switch (screenId) {
      case '01_ADMIN_LOGIN':
        setEmail('office@maplegrove.edu');
        setPassword('••••••••••••');
        setIsPasswordVisible(false);
        setIsLoading(false);
        setErrorMessage(null);
        break;
      case '02_FORGOT_PASSWORD':
        setEmail('office@maplegrove.edu');
        setIsLoading(false);
        setErrorMessage(null);
        break;
      case '03_OTP_VERIFICATION':
        setOtp('');
        setResendSeconds(48);
        setIsLoading(false);
        setErrorMessage(null);
        break;
      case '04_RESET_PASSWORD':
        setNewPassword('');
        setConfirmPassword('');
        setIsLoading(false);
        setErrorMessage(null);
        break;
      case '05_INVALID_LOGIN':
        setEmail('admin@maplegrove.edu');
        setPassword('••••••••••••');
        setErrorMessage('Email or password is incorrect. Check your details and try again.');
        setIsLoading(false);
        break;
      case '06_SESSION_EXPIRED':
        setIsLoading(false);
        break;
      case '07_LOGIN_LOADING':
        setEmail('office@maplegrove.edu');
        setPassword('••••••••••••');
        setIsLoading(true);
        break;
      case '08_LOGIN_PASSWORD_VISIBLE':
        setEmail('office@maplegrove.edu');
        setPassword('MapleDemo24!');
        setIsPasswordVisible(true);
        setIsLoading(false);
        break;
      case '09_EMAIL_SENT':
        setEmail('office@maplegrove.edu');
        setIsLoading(false);
        break;
      case '10_OTP_INVALID_CODE':
        setOtp('248160');
        setErrorMessage('That code is incorrect. Check the email and try again.');
        setIsLoading(false);
        break;
      case '11_RESET_VALIDATION_ERROR':
        setNewPassword('maple');
        setConfirmPassword('maples');
        setErrorMessage('Passwords do not match. Re-enter your new password.');
        setIsLoading(false);
        break;
      case '12_RESET_SUCCESS':
        setIsLoading(false);
        setErrorMessage(null);
        break;
    }
  };

  return (
    <AuthFlowContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        email,
        setEmail,
        password,
        setPassword,
        rememberMe,
        setRememberMe,
        otp,
        setOtp,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        isLoading,
        isPasswordVisible,
        togglePasswordVisibility,
        errorMessage,
        setErrorMessage,
        session,
        resendSeconds,
        handleLogin,
        handleForgotPassword,
        handleVerifyOtp,
        handleResetPassword,
        handleResendOtp,
        handleSignOut,
        quickNavigateToFigmaScreen,
      }}
    >
      {children}
    </AuthFlowContext.Provider>
  );
};

export const useAuthFlow = () => {
  const context = useContext(AuthFlowContext);
  if (!context) {
    throw new Error('useAuthFlow must be used within an AuthFlowProvider');
  }
  return context;
};
