import type { APIContext } from 'astro';
import { getSession } from './session';
import { isProtectedRoute, createRedirect } from './routes';
import type { MiddlewareResult } from './types';

export async function authMiddleware({ request }: APIContext): Promise<MiddlewareResult> {
  const url = new URL(request.url);
  
  // Don't protect Netlify function routes
  if (url.pathname.startsWith('/.netlify')) {
    return null;
  }
  
  if (!isProtectedRoute(url.pathname)) {
    return null;
  }

  const session = await getSession(request);
  if (!session) {
    return createRedirect(`/login?redirect=${encodeURIComponent(url.pathname)}`);
  }

  return null;
}