import type { APIRoute } from 'astro';
import { parseCookies } from '../utils/cookies';
import { sessionStore } from '../utils/auth/session-store';

export const get: APIRoute = async ({ request }) => {
  const cookies = parseCookies(request.headers.get('cookie'));
  const sessionId = cookies['session'];
  
  if (sessionId) {
    sessionStore.delete(sessionId);
  }

  return new Response('', {
    status: 302,
    headers: {
      'Location': '/login',
      'Set-Cookie': 'session=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0'
    }
  });
};