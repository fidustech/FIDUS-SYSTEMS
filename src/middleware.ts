import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async ({ request, cookies, redirect }, next) => {
  const url = new URL(request.url);
  
  // Public paths that don't require authentication
  const publicPaths = [
    '/',
    '/login',
    '/favicon.svg',
    '/_astro',
    '/assets',
    '/.netlify'
  ];

  // Allow public paths and static assets
  if (publicPaths.some(path => url.pathname.startsWith(path))) {
    return next();
  }

  // Check authentication
  const session = cookies.get('session');
  if (!session?.value) {
    return redirect(`/login?redirect=${encodeURIComponent(url.pathname)}`);
  }

  return next();
});