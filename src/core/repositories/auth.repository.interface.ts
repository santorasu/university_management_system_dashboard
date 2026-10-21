import type { AuthCredentials, AuthSession, NewPasswordPayload } from '../entities/auth.types';

export interface IAuthRepository {
  login(credentials: AuthCredentials): Promise<AuthSession>;
  requestPasswordReset(email: string): Promise<{ sent: boolean; resendAvailableInSeconds: number }>;
  verifyOTP(email: string, code: string): Promise<{ valid: boolean }>;
  resetPassword(payload: NewPasswordPayload): Promise<{ success: boolean }>;
  checkSession(): Promise<AuthSession | null>;
  logout(): Promise<void>;
}
