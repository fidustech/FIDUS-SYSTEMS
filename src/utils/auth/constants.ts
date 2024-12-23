export const AUTH_CONSTANTS = {
  ROUTES: {
    LOGIN: '/login',
    DEFAULT_REDIRECT: '/docs/architecture/overview',
    PUBLIC_PATHS: [
      '/login',
      '/favicon.svg',
      '/_astro',
      '/assets',
      '/.netlify'
    ]
  },
  ERRORS: {
    REQUIRED: 'Password is required',
    INVALID: 'Invalid password',
    GENERIC: 'Authentication failed. Please try again.'
  }
} as const;