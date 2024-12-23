export const AUTH_CONFIG = {
  SESSION_COOKIE: 'session',
  SESSION_DURATION: 8 * 60 * 60, // 8 hours in seconds
  COOKIE_OPTIONS: {
    httpOnly: true,
    path: '/',
    sameSite: 'lax' as const,
    secure: true
  }
} as const;