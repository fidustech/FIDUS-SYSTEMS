import { parseCookies } from '../cookies';
import { generateId } from './id';
import { sessionStore } from './session-store';
import { AUTH_CONFIG } from './config';
import type { Session } from './types';

export function createSession(): Session {
  const id = generateId();
  const expires = Date.now() + AUTH_CONFIG.SESSION_DURATION * 1000;
  
  sessionStore.set(id, expires);
  
  return { id, expires };
}

export function createSessionCookie(sessionId: string): string {
  const { SESSION_COOKIE, SESSION_DURATION, COOKIE_OPTIONS } = AUTH_CONFIG;
  
  const cookieOptions = Object.entries({
    ...COOKIE_OPTIONS,
    'Max-Age': SESSION_DURATION
  })
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');

  return `${SESSION_COOKIE}=${sessionId}; ${cookieOptions}`;
}

export function getSession(request: Request): Session | null {
  const cookies = parseCookies(request.headers.get('cookie'));
  const sessionId = cookies[AUTH_CONFIG.SESSION_COOKIE];
  
  if (!sessionId) {
    return null;
  }

  const expires = sessionStore.get(sessionId);
  if (!expires) {
    return null;
  }

  // Check expiration
  if (Date.now() > expires) {
    sessionStore.delete(sessionId);
    return null;
  }

  return { id: sessionId, expires };
}

export function clearSession(sessionId: string): void {
  sessionStore.delete(sessionId);
}

// Run session cleanup periodically
setInterval(() => {
  sessionStore.cleanup();
}, 60 * 1000); // Every minute