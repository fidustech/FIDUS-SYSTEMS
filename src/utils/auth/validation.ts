import { verifyPassword } from './password';
import { createSession } from './session';
import { AUTH_CONSTANTS } from './constants';
import type { AuthResult } from './types';

export async function validateLogin(password: string | null): Promise<AuthResult> {
  if (!password) {
    return {
      success: false,
      error: AUTH_CONSTANTS.ERRORS.REQUIRED
    };
  }

  if (!verifyPassword(password)) {
    return {
      success: false,
      error: AUTH_CONSTANTS.ERRORS.INVALID
    };
  }

  const session = createSession();
  return {
    success: true,
    sessionId: session.id
  };
}