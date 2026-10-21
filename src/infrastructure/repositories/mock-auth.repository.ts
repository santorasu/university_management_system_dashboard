import type { AuthCredentials, AuthSession, NewPasswordPayload } from '../../core/entities/auth.types';
import { InvalidCredentialsError, InvalidOTPError, PasswordMismatchError, WeakPasswordError } from '../../core/errors/auth.errors';
import type { IAuthRepository } from '../../core/repositories/auth.repository.interface';
import { PasswordValidatorService } from '../services/password-validator.service';

const DEMO_EMAIL = 'office@maplegrove.edu';
const DEMO_PASSWORD = 'MapleDemo24!';
const VALID_OTP = '248160';

export class MockAuthRepository implements IAuthRepository {
  private currentSession: AuthSession | null = null;

  private delay(ms = 600): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async login(credentials: AuthCredentials): Promise<AuthSession> {
    await this.delay(700);

    const emailMatch = credentials.email.trim().toLowerCase() === DEMO_EMAIL.toLowerCase();
    const passMatch = credentials.password === DEMO_PASSWORD;

    if (!emailMatch || !passMatch) {
      throw new InvalidCredentialsError();
    }

    const session: AuthSession = {
      token: `edusync_jwt_${Date.now()}`,
      user: {
        id: 'usr_admin_01',
        email: credentials.email,
        name: 'Sarah Jenkins',
        role: 'ADMIN',
        schoolName: 'Maple Grove School',
      },
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    };

    this.currentSession = session;
    if (credentials.rememberMe) {
      localStorage.setItem('edusync_remember_email', credentials.email);
    } else {
      localStorage.removeItem('edusync_remember_email');
    }

    return session;
  }

  async requestPasswordReset(_email: string): Promise<{ sent: boolean; resendAvailableInSeconds: number }> {
    await this.delay(600);
    return {
      sent: true,
      resendAvailableInSeconds: 60,
    };
  }

  async verifyOTP(_email: string, code: string): Promise<{ valid: boolean }> {
    await this.delay(500);
    if (code !== VALID_OTP) {
      throw new InvalidOTPError();
    }
    return { valid: true };
  }

  async resetPassword(payload: NewPasswordPayload): Promise<{ success: boolean }> {
    await this.delay(650);

    const strength = PasswordValidatorService.validate(payload.newPassword);
    if (!strength.isValid) {
      throw new WeakPasswordError();
    }

    if (payload.newPassword !== payload.confirmPassword) {
      throw new PasswordMismatchError();
    }

    return { success: true };
  }

  async checkSession(): Promise<AuthSession | null> {
    return this.currentSession;
  }

  async logout(): Promise<void> {
    await this.delay(200);
    this.currentSession = null;
  }
}

export const defaultAuthRepository = new MockAuthRepository();
