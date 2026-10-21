import type { PasswordCriteriaStatus } from '../../core/entities/auth.types';

export class PasswordValidatorService {
  public static validate(password: string): PasswordCriteriaStatus {
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    const isValid = hasMinLength && hasUppercase && (hasNumber || hasSymbol);

    return {
      hasMinLength,
      hasUppercase,
      hasNumber,
      hasSymbol,
      isValid,
    };
  }
}
