import { isAuthenticated } from '../utils/auth';
import type { APIContext } from 'astro';

export async function checkAuth(request: Request) {
  if (!await isAuthenticated(request)) {
    return new Response('', {
      status: 302,
      headers: { 
        'Location': '/login?redirect=' + encodeURIComponent(new URL(request.url).pathname)
      }
    });
  }
  return null;
}

export function requireAuth() {
  return async (context: APIContext) => {
    const response = await checkAuth(context.request);
    if (response) return response;
    return await context.next();
  };
}