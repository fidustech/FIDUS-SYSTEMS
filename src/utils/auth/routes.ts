import { AUTH_CONSTANTS } from './constants';
import type { RedirectOptions } from './types';

export function isProtectedRoute(pathname: string): boolean {
  return !AUTH_CONSTANTS.ROUTES.PUBLIC_PATHS.some(path => 
    pathname.startsWith(path)
  );
}

export function getLoginRedirect(request: Request): string {
  const url = new URL(request.url);
  return url.searchParams.get('redirect') || AUTH_CONSTANTS.ROUTES.DEFAULT_REDIRECT;
}

export function createRedirect(url: string, options: RedirectOptions = {}): Response {
  const { status = 302, headers = {} } = options;
  
  return new Response(null, {
    status,
    headers: { 
      Location: url,
      ...headers
    }
  });
}