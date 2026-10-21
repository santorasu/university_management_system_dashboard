export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
  schoolName: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthSession {
  token: string;
  user: User;
  expiresAt: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface OTPVerification {
  email: string;
  code: string;
}

export interface NewPasswordPayload {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordCriteriaStatus {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  isValid: boolean;
}

export type AuthScreenId =
  | '01_ADMIN_LOGIN'
  | '02_FORGOT_PASSWORD'
  | '03_OTP_VERIFICATION'
  | '04_RESET_PASSWORD'
  | '05_INVALID_LOGIN'
  | '06_SESSION_EXPIRED'
  | '07_LOGIN_LOADING'
  | '08_LOGIN_PASSWORD_VISIBLE'
  | '09_EMAIL_SENT'
  | '10_OTP_INVALID_CODE'
  | '11_RESET_VALIDATION_ERROR'
  | '12_RESET_SUCCESS'
  | 'DASHBOARD';

export interface ScreenMetadata {
  id: AuthScreenId;
  figmaName: string;
  stepNumber: string;
  description: string;
}

export const AUTH_SCREENS_CATALOG: ScreenMetadata[] = [
  { id: '01_ADMIN_LOGIN', figmaName: '01 Admin Login', stepNumber: '01', description: 'Primary administrator login with school context & secure credentials form' },
  { id: '02_FORGOT_PASSWORD', figmaName: '02 Forgot Password', stepNumber: '02', description: 'Step 1 of recovery: Request verification code by admin email' },
  { id: '03_OTP_VERIFICATION', figmaName: '03 OTP Verification', stepNumber: '03', description: 'Step 2 of recovery: 6-digit OTP code verification with countdown' },
  { id: '04_RESET_PASSWORD', figmaName: '04 Reset Password', stepNumber: '04', description: 'Step 3 of recovery: Set new password with dynamic strength validation' },
  { id: '05_INVALID_LOGIN', figmaName: '05 Invalid Login State', stepNumber: '05', description: 'Validation feedback banner for incorrect admin credentials' },
  { id: '06_SESSION_EXPIRED', figmaName: '06 Session Expired State', stepNumber: '06', description: 'Inactivity session timeout alert with reauthentication CTA' },
  { id: '07_LOGIN_LOADING', figmaName: '07 Login — Loading', stepNumber: '07', description: 'Submitting state with button spinner and disabled controls' },
  { id: '08_LOGIN_PASSWORD_VISIBLE', figmaName: '08 Login — Password Visible', stepNumber: '08', description: 'Toggled password reveal state with unmasked input' },
  { id: '09_EMAIL_SENT', figmaName: '09 Forgot Password — Email Sent', stepNumber: '09', description: 'Recovery confirmation banner after sending verification link' },
  { id: '10_OTP_INVALID_CODE', figmaName: '10 OTP — Invalid Code', stepNumber: '10', description: 'Incorrect OTP code state with highlighted error inputs' },
  { id: '11_RESET_VALIDATION_ERROR', figmaName: '11 Reset Password — Validation Error', stepNumber: '11', description: 'Password mismatch or requirement error highlighting' },
  { id: '12_RESET_SUCCESS', figmaName: '12 Reset Password — Success', stepNumber: '12', description: 'Password updated confirmation with return-to-login CTA' },
];
