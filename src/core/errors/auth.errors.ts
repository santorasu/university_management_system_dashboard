export class AuthDomainError extends Error {
  readonly code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = 'AuthDomainError';
    this.code = code;
  }
}

export class InvalidCredentialsError extends AuthDomainError {
  constructor(message = 'Email or password is incorrect. Check your details and try again.') {
    super(message, 'INVALID_CREDENTIALS');
  }
}

export class InvalidOTPError extends AuthDomainError {
  constructor(message = 'That code is incorrect. Check the email and try again.') {
    super(message, 'INVALID_OTP');
  }
}

export class PasswordMismatchError extends AuthDomainError {
  constructor(message = 'Passwords do not match. Re-enter your new password.') {
    super(message, 'PASSWORD_MISMATCH');
  }
}

export class WeakPasswordError extends AuthDomainError {
  constructor(message = 'Use at least 8 characters, with uppercase and a number.') {
    super(message, 'WEAK_PASSWORD');
  }
}

export class SessionExpiredError extends AuthDomainError {
  constructor(message = "For your school's security, you've been signed out after a period of inactivity.") {
    super(message, 'SESSION_EXPIRED');
  }
}
