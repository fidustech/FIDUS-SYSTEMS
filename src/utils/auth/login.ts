import { verifyPassword } from './password';
import { createSession } from './session';
import type { LoginResult } from './types';

export async function handleLogin(password: string | null): Promise<LoginResult> {
  if (!password) {
    return {
      success: false,
      error: 'Password is required'
    };
  }

  if (!verifyPassword(password)) {
    return {
      success: false, 
      error: 'Invalid password'
    };
  }

  const session = createSession();
  
  return {
    success: true,
    sessionId: session.id
  };
}